
async function fetchCircuits() {

    const response = await fetch("https://ergast.com/api/f1/circuits.json?limit=80")
    const data = await response.json();

    const circuitArr = data.MRData.CircuitTable.Circuits;

    await Promise.all(circuitArr.map(async (circuit) => {
        const croppedWikiUrl = await circuit.url.split(/\/|#/).pop();
        circuit.photo = await getCircuitPhoto(croppedWikiUrl);
        if (!circuit.photo) {
            const remadeUrl = await circuit.url.split(/\/|#/).splice(-2, 1)[0];
            circuit.photo = await getCircuitPhoto(remadeUrl);
            if (!circuit.photo) {
                circuit.photo = "/rsr/img/placeholder_track.jpg";
            }
        }
    }));

    return circuitArr;
}

async function getCircuitPhoto(croppedWikiUrl) {

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


async function getCircuit(cId) {
    console.log(cId);
    let circuits = await fetchCircuits();
    let foundCircuit = circuits.find(circuits => circuits[circuitName] === cId);
    console.log(circuits);
    return foundCircuit;
};

async function getCircuits() {
    let circuits = await fetchCircuits();
    return circuits;
}

export default { getCircuit, getCircuits };