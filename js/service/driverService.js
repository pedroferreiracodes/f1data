

async function fetchDrivers() {

    const response = await fetch("https://ergast.com/api/f1/drivers.json?limit=900")
    const data = await response.json();

    const driversArr = data.MRData.DriverTable.Drivers;

    await Promise.all(driversArr.map(async (driver) => {
        const croppedWikiUrl = await driver.url.split(/\/|#/).pop();
        driver.photo = await getDriverPhoto(croppedWikiUrl);
        if (!driver.photo) {
            const remadeUrl = driver.url;
            if (!driver.photo) {
                driver.photo = "rsr/img/scottChegg.jpg";
            }
        }
    }));
    return driversArr;
}

async function getDriverPhoto(croppedWikiUrl) {

    try {
        const fetchedPhotoData = await fetch(`https://en.wikipedia.org/w/api.php?origin=*&action=query&titles=${croppedWikiUrl}&prop=pageimages&format=json&pithumbsize=420&redirects`)
        const photodata = await fetchedPhotoData.json();
        const photovalues = photodata.query.pages;
        const aaaa = Object.values(photovalues)[0];
        const photoUrl = aaaa.thumbnail.source;

        return photoUrl;

    } catch (error) {
        return null;
    }
}

async function getDriverRaceWins(driver) {
    try {
        const fetchedDriverWins = await fetch(`https://ergast.com/api/f1/drivers/${driver.driverId}/driverStandings.json`);
        const driverData = await fetchedDriverWins.json();
        const winsArr = driverData.MRData.StandingsTable.StandingsLists;

        let winsSum = 0;
        winsArr.forEach(element => {
            winsSum = winsSum + parseInt(element.DriverStandings[0].wins);
            winsSum += parseInt(element.DriverStandings[0].wins);
        });
        driver.raceWins = winsSum;
        return driver;
    } catch (error) {
        return null
    }
}



async function getDriver(index) {
    const drivers = await fetchDrivers();
    return drivers[index]
};

async function getDrivers() {
    const drivers = await fetchDrivers();
    return drivers;
}


export default { getDriver, getDrivers, getDriverRaceWins, getDriverPhoto };