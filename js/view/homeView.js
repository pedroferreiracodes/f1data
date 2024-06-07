function clear() {
  const container = $('#container');
  container.html('');
}

async function render(currentSeasonObj) {

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
  currentSeason.html(`<h2>${currentSeasonObj.season} SEASON</h2>`);
  container.append(currentSeason);

  const constructorsChampionshipTitle = $("<div>").addClass("homeConstructorsChampionshipTitle");
  constructorsChampionshipTitle.html(`<h3>CONSTRUCTORS CHAMPIONSHIP</h3>`);
  container.append(constructorsChampionshipTitle);


  const list = $("<div>");

  list.addClass("currentSeasonList");
  list.html(`<div class="list"></div>`);
  list.css({
    "justify-content": "center"
  });

  function renderCurrentSeason(currentSeasonObj) {

    const currentSeasonArr = currentSeasonObj.ConstructorStandings;
    console.log(currentSeasonArr)
    list.html("");
    currentSeasonArr.forEach(({ position, points, Constructor }) => {
      console.log(Constructor.constructorLogo);
      const item = $("<div>").html(`
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

      list.append(item);
    });
  }
  renderCurrentSeason(currentSeasonObj);


  list.on('wheel', function (event) {
    if (event.originalEvent.deltaY !== 0) {
      event.preventDefault();
      $(this).scrollLeft($(this).scrollLeft() + event.originalEvent.deltaY * 1);
    }
  });



  list.scrollLeft(0);
  container.append(list);


}



export default { clear, render };
