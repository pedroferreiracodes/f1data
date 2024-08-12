function clear() {
  const container = $('#container');
  container.html("");
}


async function render(circuits) {

  const container = $("#container");

  const introduction = $("<div>").addClass("circuitsIntro");
  introduction.html(`<h4>BROWSE F1 CIRCUITS</h4>`);
  container.append(introduction);

  const circuitsTitle = $("<div>").addClass("circuitsTitle");
  circuitsTitle.html(`<h1>CIRCUITS</h1>`);
  container.append(circuitsTitle);

  const titleImageDiv = $("<div>").addClass("titleImageDiv");
  const titleImage = $("<img>").attr({ src: 'rsr/img/circuitsViewImg.png', id: 'circuitImage', class: 'circuitsTitleImage' });
  titleImageDiv.append(titleImage)
  container.append(titleImageDiv);

  $(window).on('scroll', function () {
    var scrollPosition = $(this).scrollTop();
    var offset = scrollPosition * -0.05;

    $('#circuitImage').css({transform: 'translateX(' + offset + 'px'});
  });


  const formDiv = $("<div>").addClass("formDiv");
  const filterForm = $('<form>').addClass("filterForm");
  const filterByLabel = $('<label>').attr({
    'for': 'countryInput',
    'id': 'filterByLabel'
  }).text('FILTER BY');

  const countryInput = $('<input>').attr({
    type: 'text',
    placeholder: 'COUNTRY'
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

  const orderByCountryOption = $('<div>').addClass("orderByOption");
  const orderByCountryOptionbtn = $('<div>').addClass("btn");
  const orderByCountryLabel = $('<label>').attr('for', 'orderByCountry').text('COUNTRY');
  const orderByCountryInput = $('<input>').attr({
    type: 'radio',
    name: 'orderBy',
    id: 'orderByCountry',
    value: 'country',
    class: 'input'
  });

  orderByForm.append(orderByLabel);

  orderByNameOptionbtn.append(orderByNameLabel)
  orderByNameOption.append(orderByNameInput, orderByNameOptionbtn);
  orderByCountryOptionbtn.append(orderByCountryLabel);
  orderByCountryOption.append(orderByCountryInput, orderByCountryOptionbtn);

  orderByForm.append(orderByNameOption, orderByCountryOption);
  formDiv.append(orderByForm);
  container.append(formDiv);


  const list = $('<div>').addClass("list driverList");
  container.append(list);

  function renderCircuits(circuits) {
    list.html("");
    circuits.forEach(({ circuitName, url, Location, photo, circuitId }) => {
      const {locality, country} = Location;
      const circuitItem = $("<div>").html(`
                          <a href="#/drivers/${circuitId}">
                            <div class="cardDiv circuitCard">
                              <div class="circuitImgDiv circuitCard">
                                <img class="circuitCardImg circuitCard" src="${photo}" alt="${circuitName} photo">
                              </div>
                              <div class="cardTextDiv circuitCard">
                                <h3 class="card-title circuitCard">${circuitName}</h3>
                                <p class="card-text circuitCard"> ${locality}, ${country}</p>
                              </div>
                            </div>
                          </a>`);
      list.append(circuitItem);
    });
  }




  let filteredCircuits = circuits;

  function applyFilters() {
    const countrySearchTerm = countryInput.val().trim().toLowerCase();
    const nameSearchTerm = nameInput.val().trim().toLowerCase();
    const orderByInput = $('input[name="orderBy"]:checked').val();

    let filteredCircuits = circuits.filter(({ Location, circuitName }) =>
      Location.country.toLowerCase().includes(countrySearchTerm) &&
      circuitName.toLowerCase().includes(nameSearchTerm)
    );

    orderCircuits(filteredCircuits, orderByInput);
    renderCircuits(filteredCircuits);
  }

  applyFilters();
  countryInput.on('input', applyFilters);
  nameInput.on('input', applyFilters);
  orderByForm.on('input', applyFilters)

}


function orderCircuits(filteredCircuits, orderByArg) {

  if (orderByArg === "name") {

    filteredCircuits.sort((a, b) => {
      const nameA = a.circuitName.toLowerCase();
      const nameB = b.circuitName.toLowerCase();
      return nameA.localeCompare(nameB);
    })
  }

  if (orderByArg === "country") {

    filteredCircuits.sort((a, b) => {
      const countryA = a.Location.country.toLowerCase();
      const countryB = b.Location.country.toLowerCase();
      return countryA.localeCompare(countryB);
    })
  }


}

export default { clear, render };
