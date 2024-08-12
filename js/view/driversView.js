function clear() {
  const container = $('#container');
  container.html("");
}


async function render(drivers) {

  const container = $('#container');

  const introduction = $("<div>").addClass("driversIntro");
  introduction.html(`<h4>BROWSE F1 DRIVERS</h4>`);
  container.append(introduction);

  const driversTitle = $("<div>").addClass("driversTitle");
  driversTitle.html(`<h1>DRIVERS</h1>`);
  container.append(driversTitle);

  const titleImage = $("<img>").attr({ src: 'rsr/img/driversViewImg.png', id: 'driverImage', class: 'driversTitleImage' });
  container.append(titleImage);

  $(window).on('scroll', function () {
    var scrollPosition = $(this).scrollTop();
    var offset = scrollPosition * 0.05;

    $('#driverImage').css({transform: 'translateX(' + offset + 'px'});
  });

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
    'for': 'orderByForm',
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
  orderByNameOption.append(orderByNameInput, orderByNameOptionbtn);
  orderByNationalityOptionbtn.append(orderByNationalityLabel);
  orderByNationalityOption.append(orderByNationalityInput, orderByNationalityOptionbtn);

  orderByForm.append(orderByNameOption, orderByNationalityOption);
  formDiv.append(orderByForm);
  container.append(formDiv);



  const list = $('<div>').addClass("list driverList");
  container.append(list);

  function renderDrivers(drivers) {
    list.html("");
    drivers.forEach(({ givenName, familyName, nationality, photo, driverId }) => {
      const driverItem = $("<div>").html(`
                          <a href="#/drivers/${driverId}">
                            <div class="cardDiv driverCard">
                              <div class="driverImgDiv driverCard">
                                <img class="driverCardImg driverCard" src="${photo}" alt="${givenName} ${familyName} photo">
                              </div>
                              <div class="cardTextDiv driverCard">
                                <h3 class="card-title driverCard">${givenName} ${familyName}</h3>
                                <p class="card-text driverCard">${nationality}</p>
                              </div>
                            </div>
                          </a>`);
      list.append(driverItem);
    });
  }




  let filteredDrivers = drivers;

  function applyFilters() {
    const nationalitySearchTerm = countryInput.val().trim().toLowerCase();
    const nameSearchTerm = nameInput.val().trim().toLowerCase();
    const orderByInput = $('input[name="orderBy"]:checked').val();

    let filteredDrivers = drivers.filter(({ nationality, givenName, familyName }) =>
      nationality.toLowerCase().includes(nationalitySearchTerm) &&
      (`${givenName} ${familyName}`).toLowerCase().includes(nameSearchTerm)
    );

    orderDrivers(filteredDrivers, orderByInput);
    renderDrivers(filteredDrivers);
  }

  applyFilters();
  countryInput.on('input', applyFilters);
  nameInput.on('input', applyFilters);
  orderByForm.on('input', applyFilters)

}


function orderDrivers(filteredDrivers, orderByArg) {

  if (orderByArg === "name") {

    filteredDrivers.sort((a, b) => {
      const nameA = a.familyName.toLowerCase();
      const nameB = b.familyName.toLowerCase();
      return nameA.localeCompare(nameB);
    })
  }

  if (orderByArg === "nationality") {

    filteredDrivers.sort((a, b) => {
      const nationalityA = a.nationality.toLowerCase();
      const nationalityB = b.nationality.toLowerCase();
      return nationalityA.localeCompare(nationalityB)
    })
  }

}

export default { clear, render };

