function clear() {
  const container = $('#container');
  container.html('');
}

async function render(constructorChampionshipObj, driverChampionship) {

  const container = $('#container');

  const introduction = $("<div>").addClass("homeIntro");
  introduction.html(`<h4>WELCOME TO F1DATA</h4><h4>A PLACE TO EXPLORE FORMULA ONE HISTORY</h4>`);
  container.append(introduction);

  const homeTitle = $("<div>").addClass("homeTitle");
  homeTitle.html(`<h1>F1DATA</h1>`);
  container.append(homeTitle);

  const image = $("<img>").attr("src", "rsr/img/index_side.png").addClass("homeSideF1");
  container.append(image);

  const currentSeason = $("<div>").addClass("homeSeason");
  currentSeason.html(`<h2>${constructorChampionshipObj.season} SEASON</h2>`);
  container.append(currentSeason);

  const driversChampionshipTitle = $("<div>").addClass("homeChampTitle homeDriverChampTitle");
  const dChampGradientSpan = $('<span/>').addClass("homeChampTitle");;
  const driversChampionshipTitleText = $(`<h3>DRIVERS CHAMPIONSHIP</h3>`);
  driversChampionshipTitle.append(dChampGradientSpan);
  driversChampionshipTitle.append(driversChampionshipTitleText)
  container.append(driversChampionshipTitle);


  const driverList = $("<div>");
  driverList.addClass("currentSeasonList");
  driverList.html(`<div class="list"></div>`);

  function renderDriversChampionship(driverChampionship) {

    driverList.html("");
    driverChampionship.forEach(({ position, points, Driver, Constructors }) => {
      const driverItem = $("<div>").html(`
        <a href="#/drivers/">
          <div class="cardDiv homeSeasonCard">
          <img class="cardImg homeSeasonCard " src="${Driver.driverPhoto}" alt="${Driver.driverId} photo">
            <div class="cardTextDiv homeSeasonCard ">
              <h2 class="card-title homeSeasonCard ">${position}</h3>
              <h3 class="card-title homeSeasonCard ">${Driver.givenName} ${Driver.familyName}</h3>
              <p class="card-text homeSeasonCard ">${Constructors[0].name}</p>
              <p class="card-text homeSeasonCard ">Current points: ${points}</p>
            </div>
          </div>
        </a>
      `);

      driverList.append(driverItem);
    });
  }
  
  renderDriversChampionship(driverChampionship);


  driverList.on('wheel', function (event) {
    if (event.originalEvent.deltaY !== 0) {
      event.preventDefault();
      $(this).scrollLeft($(this).scrollLeft() + event.originalEvent.deltaY * 1);
    }
  });

  driverList.scrollLeft(0);
  container.append(driverList);

  const constructorsChampionshipTitle = $("<div>").addClass("homeChampTitle homeConstructorChampTitle");
  constructorsChampionshipTitle.html(`<h3>CONSTRUCTORS CHAMPIONSHIP</h3>`);
  container.append(constructorsChampionshipTitle);
  const cChampGradientSpan = $('<span/>').addClass("homeChampTitle");;
  constructorsChampionshipTitle.append(cChampGradientSpan);


  const constructorList = $("<div>");
  constructorList.addClass("currentSeasonList");
  constructorList.html(`<div class="list"></div>`);
 
  function renderConstructorsChampionship(constructorChampionshipObj) {

    const currentSeasonArr = constructorChampionshipObj.ConstructorStandings;
    constructorList.html("");
    currentSeasonArr.forEach(({ position, points, Constructor }) => {
      const constructorItem = $("<div>").html(`
        <a href="#/drivers/">
          <div class="cardDiv homeSeasonCard">
          <img class="cardImg homeSeasonCard " src="${Constructor.constructorLogo}" alt="${Constructor.name} Logo">
            <div class="cardTextDiv homeSeasonCard ">
              <h2 class="card-title homeSeasonCard ">${position}</h3>
              <h3 class="card-title homeSeasonCard ">${Constructor.name}</h3>
              <p class="card-text homeSeasonCard ">Current points: ${points}</p>
            </div>
          </div>
        </a>
      `);

      constructorList.append(constructorItem);
    });
  }

  renderConstructorsChampionship(constructorChampionshipObj);

  constructorList.on('wheel', function (event) {
    if (event.originalEvent.deltaY !== 0) {
      event.preventDefault();
      $(this).scrollLeft($(this).scrollLeft() + event.originalEvent.deltaY * 1);
    }
  });


  constructorList.scrollLeft(0);
  container.append(constructorList);

}

export default { clear, render };
