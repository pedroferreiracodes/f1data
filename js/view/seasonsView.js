function clear() {
  const container = $('#container');
  container.html('')
  const seasonsTitle = $("<div>").addClass("viewTitle");
  seasonsTitle.html(`<h1>SEASONS</h1>`);
  container.append(seasonsTitle);
}

async function render(seasons) {

  const container = $("#container");

  const formDiv = $("<div>").addClass("formDiv");
  const formGradientSpan = $('<span/>').addClass("formDiv");

  const orderByForm = $('<form>').addClass("orderByForm");
  const orderByLabel = $('<label>').attr({
    'for': 'orderByForm',
    'id': 'orderByLabel'
  }).text('ORDER BY');

  const orderByRecentOption = $('<div>').addClass("orderByOption");
  const orderByRecentOptionbtn = $('<div>').addClass("btn");
  const orderByRecentLabel = $('<label>').attr('for', 'orderByRecent').text('RECENT');
  const orderByRecentInput = $('<input>').attr({
    type: 'radio',
    name: 'orderBy',
    id: 'orderByRecent',
    value: 'recent',
    class: 'input'
  });

  const orderByFormerOption = $('<div>').addClass("orderByOption");
  const orderByFormerOptionbtn = $('<div>').addClass("btn");
  const orderByFormerLabel = $('<label>').attr('for', 'orderByFormer').text('FORMER');
  const orderByFormerInput = $('<input>').attr({
    type: 'radio',
    name: 'orderBy',
    id: 'orderByFormer',
    value: 'former',
    class: 'input'
  });

  
  orderByForm.append(orderByLabel);

  orderByRecentOptionbtn.append(orderByRecentLabel)
  orderByRecentOption.append(orderByRecentInput, orderByRecentOptionbtn);
  orderByFormerOptionbtn.append(orderByFormerLabel);
  orderByFormerOption.append(orderByFormerInput, orderByFormerOptionbtn);

  orderByForm.append(orderByRecentOption, orderByFormerOption);
  formDiv.append(formGradientSpan);
  formDiv.append(orderByForm);
  container.append(formDiv);


  const list = $("<div>");
  list.addClass("seasonList");

  renderSeasons(seasons);

  function renderSeasons(seasons) {
    list.html("");
    seasons.forEach(({ season, ConstructorStandings, constructorLogo }) => {
      const seasonItem = $("<div>");
      seasonItem.html(`
    <a href="#/seasons/${season}">
        <div class="cardDiv seasonCard">
          <div class="seasonImgDiv seasonCard">
            <img class="seasonCardImg seasonCard" src="${constructorLogo}" alt="${ConstructorStandings[0].Constructor.name} logo">
          </div>
          <div class="cardTextDiv seasonCard">
            <h3 class="cardTitle seasonCard">${season}</h3>
            <h5 class="cardText seasonCard">Constructors Champion: ${ConstructorStandings[0].Constructor.name}</h5>
          </div>
        </div>
    </a>
`);

      list.append(seasonItem);
    })

  }

  container.append(list);
}

export default { clear, render };
