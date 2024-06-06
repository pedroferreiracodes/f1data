async function fetchSeason(seasonYear) {

    const response = await fetch(`https://ergast.com/api/f1/${seasonYear}/constructorStandings.json`)
    const data = await response.json();
    const season = data.MRData.StandingsTable.StandingsLists[0];

    season.driverChamp = await getChamp(seasonYear);

    season.constructorChampName = season.ConstructorStandings[0].Constructor.name;
    //console.log(driverChamp);
    const wikiUrl = season.ConstructorStandings[0].Constructor.url.split(/\/|#/).pop();
    season.constructorLogo = await getConstructorLogo(season.constructorChampName);
    season.driverChampName = await getDriverChampName(season.driverChamp);

    return season;
}

async function getChamp(seasonYear) {

    try {
        const fetchedChampData = await fetch(`http://ergast.com/api/f1/${seasonYear}/driverStandings.json`);
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

    switch (constructorChampName) {
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
            return "rsr/img/teams/logo_benetton.jpg"

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
    const driverName = driverObj.driverObj.givenName + " "+ driverObj.driverObj.familyName;
    return driverName;
}


async function getSeason(year) {

    let season = await fetchSeason(year);
    return season;
};

export default { getSeason };