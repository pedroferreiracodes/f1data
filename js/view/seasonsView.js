function clear() {
  const container = document.querySelector('#container');
  container.innerHTML = '';
}

async function render(season) {

  const container = $("#container");

  const list = $("<div>");
  list.css({
    "display": "inline",
    "flex-wrap": "wrap",
    "max-width": "100%",
    "gap": "10px",
    "padding": "10px"
  }).addClass("list");

  function renderSeasons(season) {
    const item = $("<div>").addClass("item");

    item.html(`
    <a href="#/season/${season.season}">
        <div class="cardDiv seasonCard">
            <img class="cardImg" src="${season.champLogo}" alt="${season.constructorChampName} logo">
            <h3 class="card-title">${season.season}</h3>
            <h5 class="card-title">Drivers Champion: ${season}</h5>
            <h5 class="card-title">Constructors Champion: ${season.constructorChampName}</h5>
        </div>
    </a>
`);

    list.append(item);
  }

  renderSeasons(season);

  container.append(list);
}

export default { clear, render };
