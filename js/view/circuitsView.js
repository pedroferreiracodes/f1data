async function render(circuits) {

 const container = $("#container");
  container.innerHTML = ''

  const formDiv = $("#div");
  formDiv.style = `display: flex; justify-content: center; position: sticky; top:0px; padding: 10px; z-index: 1; background-color: grey; `;
  const filterForm = $("#form");
  filterForm.style = `background-color: white; padding-top: 0.2%; padding-bottom: 0.2%; padding-left: 8%; padding-right: 8%; border-radius: 5px`;

  const countryInput = document.createElement('input');
  countryInput.type = 'text';
  countryInput.placeholder = 'Filter circuits by country';

  countryInput.addEventListener('input', () => {
    const searchTerm = countryInput.value.trim().toLowerCase();
    const filteredCircuits = circuits.filter(({ Location }) =>
      `${Location.country}`.toLowerCase().includes(searchTerm)
    );
    renderCircuits(filteredCircuits);
  });

  filterForm.append(countryInput);
  formDiv.append(filterForm);
    container.append(formDiv);

  const list = document.createElement('div');
  list.innerHTML = `<div class="list"></div>`
  list.style = `display: grid; justify-content: center; max-width:95%; grid-template-columns: repeat(auto-fill, minmax(300px, 500px)); gap: 20px; padding: 10px`;


  function renderCircuits(circuits) {
    list.innerHTML = '';
    circuits.forEach(({ circuitName, url, Location, photo, circuitId }) => {
      const { locality, country } = Location;
      const item = document.createElement('div');
      item.innerHTML = ` <a href="#/circuits/${circuitId}">
                          <div class="cardDiv">
                           <img class="cardImg" src="${photo}" alt="Cars at racetrack">
                          <div class="cardTextDiv">
                           <h3 class="card-title">${circuitName}</h3>
                           <p class="card-text">${locality}, ${country}</p>
                           </div>
                         </div>
                         </a>`;

      list.appendChild(item);
    });
  }

  renderCircuits(circuits);

    container.append(list);
}

export default { render };
