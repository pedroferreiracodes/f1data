async function fetchSeasons() {

    const response = await fetch("https://ergast.com/api/f1/seasons.json?limit=80")
    const data = await response.json();

    const seasonsArr = data.MRData.SeasonTable.Seasons;

    await Promise.all(seasonsArr.map(async (seasonObj) => {
     //   console.log(seasonObj.season);
        seasonObj.champ = await getChamp(seasonObj.season);

       // const croppedWikiUrl = await seasonObj.url.split(/\/|#/).pop();
/*         seasonObj.photo = await getSeasonPhoto(croppedWikiUrl);
        if (!seasonObj.photo) {
            const remadeUrl = await seasonObj.url.split(/\/|#/).splice(-2, 1)[0];
            seasonObj.photo = await getSeasonPhoto(remadeUrl);
            if (!seasonObj.photo) {
                seasonObj.photo = "/rsr/img/placeholder_season.jpg";
            }
        } */
    }));
    return seasonsArr;
}

async function getChamp(seasonYear) {

    try {
        const fetchedChampData = await fetch(`http://ergast.com/api/f1/${seasonYear}/driverStandings.json`);
        const fetchedChamp = await fetchedChampData.json();
        const champObj= {};
        champObj.driverObj = fetchedChamp.MRData.StandingsTable.StandingsLists[0].DriverStandings[0].Driver;
        champObj.constructor = fetchedChamp.MRData.StandingsTable.StandingsLists[0].DriverStandings[0].Constructors[0].name;

        return champObj;

    } catch (error) {
        return null
    }
}

async function getSeasonPhoto(croppedWikiUrl) {

    try {

        const fetchedPhotoData = await fetch(`https://en.wikipedia.org/w/api.php?origin=*&action=query&titles=${croppedWikiUrl}&prop=pageimages&format=json&pithumbsize=420&redirects`);
        const photodata = await fetchedPhotoData.json();
        const photovalues = photodata.query.pages;
        const aaaa = Object.values(photovalues)[0];
        const photoUrl = aaaa.thumbnail.source;

        return photoUrl;

    } catch (error) {
        return null
    }
}




async function getSeason(sId) {

    let seasons = await fetchSeasons();
    let foundSeason = seasons.find(seasons => seasons[seasonYear] === sId);
    console.log(season);
    return foundSeason;
};

async function getSeasons() {
    let seasons = await fetchSeasons();
    return seasons;
}

export default { getSeason, getSeasons };