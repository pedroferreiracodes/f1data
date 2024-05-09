function clear() {
  const container = document.querySelector('#container');
  container.innerHTML = '';
}

async function render(season) {

  const container = document.querySelector('#container');

  const list = document.createElement('div');
  list.style = `display: inline; flex-wrap: wrap ; max-width:100%; gap: 10px; padding: 10px`;
  list.classList.add('list');

  function renderSeasons(season) {
    const item = document.createElement('div');

    item.innerHTML = `      <a href="#/season/${season.season}">
                            <div class="cardDiv seasonCard">
                             <img class="cardImg" src="${season}" alt="season ${season}">
                             <h3 class="card-title">${season}</h3>
                             <h5 class="card-title">Drivers Champion: ${season}</h5>
                             <h5 class="card-title">Constructors Champion: ${season.constructorChampName}</h5>
                           </div>
                           </a>`;

    list.appendChild(item);
  }

  renderSeasons(season);

  container.appendChild(list);
}

export default { clear, render };
