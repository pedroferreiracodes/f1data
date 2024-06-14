import driverService from '../service/driverService.js';




async function getSeasons() {
    const response = await fetch(`https://ergast.com/api/f1/constructorStandings/1.json?limit=90`);
    const data = await response.json();
    const seasons = data.MRData.StandingsTable.StandingsLists;

    for (const element of seasons) {
        element.constructorLogo = await getConstructorLogo(element.ConstructorStandings[0].Constructor.name)
    }

console.log(seasons);
return seasons
}

async function getSeason(year) {

    const season = await fetchSeason(year);
    return season;
};



async function fetchSeason(seasonYear) {

    const response = await fetch(`https://ergast.com/api/f1/${seasonYear}/constructorStandings.json`)
    const data = await response.json();
    const season = data.MRData.StandingsTable.StandingsLists[0];

    season.driverChamp = await getChamp(seasonYear);

    season.constructorChampName = season.ConstructorStandings[0].Constructor.name;
    const wikiUrl = season.ConstructorStandings[0].Constructor.url.split(/\/|#/).pop();
    season.constructorLogo = await getConstructorLogo(season.constructorChampName);
    season.driverChampName = await getDriverChampName(season.driverChamp);

    return season;
}

async function getChamp(seasonYear) {

    try {
        const fetchedChampData = await fetch(`https://ergast.com/api/f1/${seasonYear}/driverStandings.json`);
        const fetchedChamp = await fetchedChampData.json();
        const champObj = {};
        champObj.driverObj = fetchedChamp.MRData.StandingsTable.StandingsLists[0].DriverStandings[0].Driver;
        champObj.constructor = fetchedChamp.MRData.StandingsTable.StandingsLists[0].DriverStandings[0].Constructors[0].name;

        return champObj;

    } catch (error) {
        return null
    }
}

async function getConstructorLogo(constructorChampName) {

    if (constructorChampName.includes("Lotus")) {
        return "rsr/img/teams/logo_lotus.jpg";
    };

    if (constructorChampName.includes("Alpine")) {
        return "rsr/img/teams/logo_alpine.jpg";
    };
    if (constructorChampName.includes("Haas")) {
        return "rsr/img/teams/logo_haas.jpg";
    };
    if (constructorChampName.includes("RB")) {
        return "rsr/img/teams/logo_rbf1team.jpg";
    };
    switch (constructorChampName) {

        case "Aston Martin":
            return "rsr/img/teams/logo_astonmartin.jpg";

        case "Red Bull":
            return "rsr/img/teams/logo_redbull.jpg";

        case "Mercedes":
            return "rsr/img/teams/logo_mercedes.jpg";

        case "Brawn":
            return "rsr/img/teams/logo_brawn.jpg";

        case "Ferrari":
            return "rsr/img/teams/logo_ferrari.jpg";

        case "Renault":
            return "rsr/img/teams/logo_renault.jpg";

        case "McLaren":
            return "rsr/img/teams/logo_mclaren.jpg";

        case "Williams":
            return "rsr/img/teams/logo_williams.jpg";

        case "Benetton":
            return "rsr/img/teams/logo_benetton.jpg";

        case "Sauber":
            return "rsr/img/teams/logo_sauber.jpg";

        case "Tyrrell":
            return "rsr/img/teams/logo_tyrrell.jpg";

        case "Matra-Ford":
            return "rsr/img/teams/logo_matra.jpg";

        case "Brabham-Repco":
            return "rsr/img/teams/logo_brabham.jpg";

        case "BRM":
            return "rsr/img/teams/logo_brm.jpg";

        case "Cooper-Climax":
            return "rsr/img/teams/logo_cooper.jpg";

        case "Vanwall":
            return "rsr/img/teams/logo_vanwall.jpg"
    }

}

async function getDriverChampName(driverObj) {
    const driverName = driverObj.driverObj.givenName + " " + driverObj.driverObj.familyName;
    return driverName;
}



async function getConstructorChampionship(year) {
    const season = await fetchSeason(year);

    await Promise.all(
        season.ConstructorStandings.map(async ({ Constructor }) => {
            Constructor.constructorLogo = await getConstructorLogo(Constructor.name);
        })
    );

    return season;
}

async function getDriverChampionship(year) {

    try {
        const fetchedChampData = await fetch(`https://ergast.com/api/f1/${year}/driverStandings.json`);
        const fetchedChamp = await fetchedChampData.json();

        const driverChampionship = fetchedChamp.MRData.StandingsTable.StandingsLists[0].DriverStandings;

        await Promise.all(
            driverChampionship.map(async ({ Driver }) => {
                const croppedWikiUrl = Driver.url.split(/\/|#/).pop();
                Driver.driverPhoto = await driverService.getDriverPhoto(croppedWikiUrl);
            }))
        console.log(driverChampionship);
        return driverChampionship;

    } catch (error) {
        return null
    };
}

export default { getSeason, getSeasons, getConstructorChampionship, getDriverChampionship };