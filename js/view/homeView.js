function clear() {
  const container = $('#container');
  container.html('');
}

async function render(constructorChampionshipObj, driverChampionship, lastWeekendObj, nextWeekendObj) {

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
  const dChampGradientSpan = $('<span/>').addClass("homeChampTitle");
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
        <a href="#/drivers/${Driver.driverId}">
          <div class="cardDiv homeSeasonCard">
            <img class="cardImg homeSeasonCard " src="${Driver.driverPhoto}" alt="${Driver.driverId} photo">
            <div class="cardTextDiv homeSeasonCard">
              <div class="cardTextDiv homeSeasonCard" id="card-titleDiv">
                <h3 class="card-title homeSeasonCard ">${position}</h3>
                <span class="card-title homeSeasonCard" id="driverChampPositionGradient" style="background: linear-gradient(to left, rgba(${Driver.constructorColor}) 0%, rgba(243, 241, 238, 0) 100%)"></span>
              </div>
              <div>
                <h4 class="card-title homeSeasonCard ">${Driver.givenName} ${Driver.familyName}</h4>
                <p class="card-text homeSeasonCard ">${Constructors[0].name}</p>
                <p class="card-text homeSeasonCard ">Current points: ${points}</p>
              </div>
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
              <h3 class="card-title homeSeasonCard ">${position}</h3>
              <h4 class="card-title homeSeasonCard ">${Constructor.name}</h4>
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

  const currentSeasonHr = $("<hr>");
  currentSeasonHr.css({ "border-top-style":"solid",
                        "border-color": "rgb(243, 241, 238)",
                        "border-width": "2px"});
  container.append(currentSeasonHr);

  const lastNextWeekend = $("<div>");
  lastNextWeekend.addClass("lastNextWeekendDiv");

  const lastWeekend = $("<div>").addClass("homeSeason homeWeekend");
  lastWeekend.html(`<h2>LAST RACE</h2>
                    <div>
                      <h3>${lastWeekendObj.raceName}</h3>
                    </div>`);
  lastNextWeekend.append(lastWeekend);

  const nextWeekend = $("<div>").addClass("homeSeason");
  nextWeekend.html(`<h2>NEXT RACE</h2>
                    <div>
                      <h3>${nextWeekendObj.date}</h3>
                      <h3>${nextWeekendObj.raceName}</h3>
                      <a href="#/circuits/${nextWeekendObj.Circuit.circuitId}">
                        <h4>${nextWeekendObj.Circuit.circuitName}</h4>
                      </a>  
                    </div>`);
  lastNextWeekend.append(nextWeekend);

  container.append(lastNextWeekend);

}

export default { clear, render };
