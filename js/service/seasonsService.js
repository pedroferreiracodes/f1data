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
    season.constructorColor = await getConstructorColor(season.constructorChampName);
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


async function getConstructorColor(constructorChampName) {

    if (constructorChampName.includes("Lotus")) {
        return "35,31,32,1";
    };

    if (constructorChampName.includes("Alpine")) {
        return "0,92,169,1";
    };
    if (constructorChampName.includes("Haas")) {
        return "255,255,255,1";
    };
    if (constructorChampName.includes("RB")) {
        return "21,52,204,1";
    };
    switch (constructorChampName) {

        case "Aston Martin":
            return "10,90,79,1";

        case "Red Bull":
            return "1,30,74,1";

        case "Mercedes":
            return "145,145,145,1";

        case "Brawn":
            return "231,235,0,1";

        case "Ferrari":
            return "254,0,0,1";

        case "Renault":
            return "255,222,0,1";

        case "McLaren":
            return "255,127,0,1";

        case "Williams":
            return "4,30,65,1";

        case "Benetton":
            return "0,0,0,1";

        case "Sauber":
            return "255,255,255,1";

        case "Tyrrell":
            return "38,73,115,1";

        case "Matra-Ford":
            return "1,0,128,1";

        case "Brabham-Repco":
            return "47,47,121,1";

        case "BRM":
            return "11,47,95,1";

        case "Cooper-Climax":
            return "35,31,32,1";

        case "Vanwall":
            return "0,0,0,1"
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
            driverChampionship.map(async ({ Driver, Constructors }) => {
                const croppedWikiUrl = Driver.url.split(/\/|#/).pop();
                Driver.driverPhoto = await driverService.getDriverPhoto(croppedWikiUrl);
                Driver.constructorColor = await getConstructorColor(Constructors[0].name);
            }))
        return driverChampionship;

    } catch (error) {
        return null
    };
}

async function getLastWeekend(){
    
    try{
        const fetchedLastWeekendData = await fetch(`http://ergast.com/api/f1/current/last/results.json`);
        const fetchedLastWeekendjson = await fetchedLastWeekendData.json();
        const fetchedLastWeekend = fetchedLastWeekendjson.MRData.RaceTable.Races[0];
        return fetchedLastWeekend;
    }
    catch (error) {
        return null
    }
}


async function getNextWeekend(round){
    round++;
    try{
        const fetchedNextWeekendData = await fetch(`http://ergast.com/api/f1/2024/${round}.json`);
        const fetchedNextWeekendjson = await fetchedNextWeekendData.json();
        const fetchedNextWeekend = fetchedNextWeekendjson.MRData.RaceTable.Races[0];
        return fetchedNextWeekend;
    }
    catch (error) {
        return null
    }
}



export default { getSeason, getSeasons, getConstructorChampionship, getDriverChampionship, getLastWeekend, getNextWeekend};