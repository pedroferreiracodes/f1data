function clear() {
    const container = $('#container');
    container.html('');
}

async function render(season) {

    const container = $('#container');
    const seasonYear = $("<div>").addClass("viewTitle");
    seasonYear.html(`<h1>${season.season}</h1>`);
    container.append(seasonYear);
    console.log(season)
}

export default {clear, render };
