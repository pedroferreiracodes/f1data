function clear(){
    const container = document.querySelector('#container');
    container.innerHTML = '';
}

async function render(season) {

    const container = document.querySelector('#container');
    
    const list = document.createElement('div');
    list.innerHTML = `<div class="list"></div>`
    list.style = `display: flex; flex-wrap: wrap ; max-width:95%; gap: 10px; padding: 10px`;
  
    function renderSeasons(season) {
      console.log(season);
        const item = document.createElement('div');
        item.innerHTML = ` <a href="#/season/${season.season}">
                            <div class="cardDiv seasonCard">
                             <img class="cardImg" src="${season}" alt="season ${season}">
                            <div class="cardTextDiv">
                             <h3 class="card-title">${season}</h3>
                             <h5 class="card-title">Drivers Champion: ${season}</h5>
                             <h5 class="card-title">Constructors Champion: ${season.constructorChampName}</h5>
                             </div>
                           </div>
                           </a>`;
  
        list.appendChild(item);
    }
  
    renderSeasons(season);
  
    container.appendChild(list);
  }
  
  export default { clear, render };
  