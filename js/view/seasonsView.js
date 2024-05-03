async function render(seasons) {

    const container = document.querySelector('#container');
    container.innerHTML = ''
  
    const formDiv = document.createElement('div');
    formDiv.style = `display: flex; justify-content: center; position: sticky; top:0px; padding: 10px; z-index: 1; background-color: grey; `;
    const filterForm = document.createElement('form');
    filterForm.style = `background-color: white; padding-top: 0.2%; padding-bottom: 0.2%; padding-left: 8%; padding-right: 8%; border-radius: 5px`;
  
    const countryInput = document.createElement('input');
    countryInput.type = 'text';
    countryInput.placeholder = 'Filter circuits by country';
  
    countryInput.addEventListener('input', () => {
      const searchTerm = countryInput.value.trim().toLowerCase();
      const filteredCircuits = seasons.filter(({ Location }) =>
        `${Location.country}`.toLowerCase().includes(searchTerm)
      );
      renderSeasons(filteredSeasons);
    });
  
    filterForm.appendChild(countryInput);
    formDiv.appendChild(filterForm);
    container.appendChild(formDiv);
  
    const list = document.createElement('div');
    list.innerHTML = `<div class="list"></div>`
    list.style = `display: grid; justify-content: center; max-width:95%; grid-template-columns: repeat(auto-fill, minmax(300px, 500px)); gap: 20px; padding: 10px`;
  
    function renderSeasons(seasons) {
      list.innerHTML = '';
      seasons.forEach(({season, champ}) => {
        console.log(seasons);
        //const {driver}
        const item = document.createElement('div');
        item.innerHTML = ` <a href="#/season/${season}">
                            <div class="cardDiv">
                             <img class="cardImg" src="${season}" alt="season ${season}">
                            <div class="cardTextDiv">
                             <h3 class="card-title">${season}</h3>
                             <h5 class="card-title">Drivers Champion: ${season}</h5>
                             <h5 class="card-title">Constructors Champion: ${season}</h5>
                             </div>
                           </div>
                           </a>`;
  
        list.appendChild(item);
      });
    }
  
    renderSeasons(seasons);
  
    container.appendChild(list);
  }
  
  export default { render };
  