function clear() {
  const container = $('#container');
  container.html('')
}


async function render(drivers) {

  const container = document.querySelector('#container');
  container.innerHTML = '';

  const formDiv = document.createElement('div');
  formDiv.style = `display: flex; justify-content: center; position: sticky; top:35px; padding: 10px; z-index: 10; background-color: grey; `;
  const filterForm = document.createElement('form');
  filterForm.style = `background-color: white; padding-top: 0.2%; padding-bottom: 0.2%; padding-left: 8%; padding-right: 8%; border-radius: 5px`;

  const countryInput = document.createElement('input');
  countryInput.type = 'text';
  countryInput.placeholder = 'Filter drivers by nationality';

  countryInput.addEventListener('input', () => {
    const searchTerm = countryInput.value.trim().toLowerCase();
    const filteredDrivers = drivers.filter(({ nationality }) =>
      `${nationality}`.toLowerCase().includes(searchTerm)
    );
    renderDrivers(filteredDrivers);
  });

  filterForm.appendChild(countryInput);
  formDiv.appendChild(filterForm);
  container.appendChild(formDiv);

  const list = document.createElement('div');
  list.innerHTML = `<div class="list"></div>`
  list.style = `display: grid; max-width:95%; justify-content: center; grid-template-columns: repeat(auto-fill, minmax(300px, 500px)); gap:20px; padding: 10px`;



  async function renderDrivers(drivers) {
    list.innerHTML = '';
    await drivers.forEach(({ givenName, familyName, nationality, photo }) => {
      const item = document.createElement('div');
      item.innerHTML = ` <a href="#/drivers/#">
                          <div class="cardDiv">
                           <img class="cardImg" src="${photo}" alt="Awesome Driver">
                          <div class="cardTextDiv">
                           <h3 class="card-title">${givenName} ${familyName}</h3>
                           <p class="card-text">${nationality}</p>
                           </div>
                         </div>
                         </a>`;

      list.appendChild(item);
    });
  }

  renderDrivers(drivers);

  container.appendChild(list);
}



export default { clear, render };

