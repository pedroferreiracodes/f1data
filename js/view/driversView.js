function clear() {
  const container = $('#container');
  container.html("");
}


async function render(drivers) {

  const container = $('#container');

  const formDiv = $("<div>").addClass("formDiv");
  const filterForm = $('<form>').addClass("filterForm");
  const filterByLabel = $('<label>').attr({
    'for': 'countryInput',
    'id': 'filterByLabel'
  }).text('FILTER BY');

  const countryInput = $('<input>').attr({
    type: 'text',
    placeholder: 'NATIONALITY'
  });


  const nameInput = $('<input>').attr({
    type: 'text',
    placeholder: 'NAME'
  });

  filterForm.append(filterByLabel)
  filterForm.append(countryInput);
  filterForm.append(nameInput)
  formDiv.append(filterForm);

  const orderByForm = $('<form>').addClass("orderByForm");
  const orderByLabel = $('<label>').attr({
    'for': 'orderByInput',
    'id': 'orderByLabel'
  }).text('ORDER BY');

  const orderByNameOption = $('<div>').addClass("orderByOption");
  const orderByNameOptionbtn = $('<div>').addClass("btn");
  const orderByNameLabel = $('<label>').attr('for', 'orderByName').text('NAME');
  const orderByNameInput = $('<input>').attr({

    type: 'radio',
    name: 'orderBy',
    id: 'orderByName',
    value: 'name',
    class: 'input'
  });

  const orderByNationalityOption = $('<div>').addClass("orderByOption");
  const orderByNationalityOptionbtn = $('<div>').addClass("btn");
  const orderByNationalityLabel = $('<label>').attr('for', 'orderByNationality').text('NATIONALITY');
  const orderByNationalityInput = $('<input>').attr({
    type: 'radio',
    name: 'orderBy',
    id: 'orderByNationality',
    value: 'nationality',
    class: 'input'
  });

  orderByForm.append(orderByLabel);

  orderByNameOptionbtn.append(orderByNameLabel)
  orderByNameOption.append(orderByNameInput);
  orderByNameOption.append(orderByNameOptionbtn);
  orderByForm.append(orderByNameOption);

  orderByNationalityOptionbtn.append(orderByNationalityLabel);
  orderByNationalityOption.append(orderByNationalityInput);
  orderByNationalityOption.append(orderByNationalityOptionbtn);
  orderByForm.append(orderByNationalityOption)


  formDiv.append(orderByForm);
  container.append(formDiv);



  const list = $('<div>').addClass("list driverList");

  async function renderDrivers(drivers) {
    list.html("");
    await drivers.forEach(({ givenName, familyName, nationality, photo }) => {
      const driverItem = $("<div>").html(`<a href="#/drivers/#">
                          <div class="cardDiv driverCardDiv">
                           <img class="cardImg" src="${photo}" alt="Awesome Driver">
                          <div class="cardTextDiv">
                           <h3 class="card-title">${givenName} ${familyName}</h3>
                           <p class="card-text">${nationality}</p>
                           </div>
                         </div>
                         </a>`);

      list.append(driverItem);
      container.append(list);
    });
  }



  let filteredDrivers = drivers;

  const applyFilters = () => {
    const nationalitySearchTerm = countryInput.val().trim().toLowerCase();
    const nameSearchTerm = nameInput.val().trim().toLowerCase();

    filteredDrivers = drivers.filter(({ nationality, givenName, familyName }) =>
      `${nationality}`.toLowerCase().includes(nationalitySearchTerm) &&
      `${givenName} ${familyName}`.toLowerCase().includes(nameSearchTerm)
    );
    renderDrivers(filteredDrivers);
  };

  countryInput.on('input', applyFilters);
  nameInput.on('input', applyFilters);
  renderDrivers(filteredDrivers);
}


export default { clear, render };

