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

  const list = $("<div>");
  list.addClass("currentSeasonList");
  list.html(`<div class="list"></div>`);
  list.css({
    "display": "inline",
    "justify-content": "center",
    "max-width": "100%"
  });

  function renderCurrentSeason(currentSeasonObj) {
    console.log(currentSeasonObj);
    const currentSeasonArr = currentSeasonObj.ConstructorStandings;
    list.html("");
    currentSeasonArr.forEach(({ position, points, Constructor }) => {

      const item = $("<div>").html(`
        <a href="#/drivers/">
          <div class="cardDiv homeSeasonCard">
          <img class="cardImg homeSeasonCard " src="rsr/img/teams/logo_redbull.jpg" alt="Cars at racetrack">
            <div class="cardTextDiv homeSeasonCard ">
              <h3 class="card-title homeSeasonCard ">${Constructor.name}</h3>
              <p class="card-text homeSeasonCard ">${points}</p>
            </div>
          </div>
        </a>
      `);

      list.append(item);
    });
  }

  renderCurrentSeason(currentSeasonObj);

  container.append(list);


}

export default { clear, render };
