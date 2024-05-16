async function fetchSeason(seasonYear) {

    const driverChamp = await getChamp(seasonYear);

    const response = await fetch(`https://ergast.com/api/f1/${seasonYear}/constructorStandings.json`)
    const data = await response.json();
    const season = data.MRData.StandingsTable.StandingsLists[0];


    season.constructorChampName = season.ConstructorStandings[0].Constructor.name;
    //console.log(driverChamp);
    const wikiUrl = season.ConstructorStandings[0].Constructor.url.split(/\/|#/).pop();
    season.champLogo = await getChampLogo(season.constructorChampName);
    
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

async function getChampLogo(constructorChampName) {

    switch (constructorChampName) {
        case "Red Bull":
        return "rsr/img/teams/red_bull.png";

        case "Mercedes":
        return "rsr/img/teams/mercedes.JPG";
    }
   
}




async function getSeason(year) {

    let season = await fetchSeason(year);
    return season;
};

export default { getSeason };