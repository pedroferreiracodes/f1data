import seasonsService from '../service/seasonsService.js';
import seasonsView from '../view/seasonsView.js';






async function init() {

  seasonsView.clear();

  const date = new Date();
  let currentYear = date.getFullYear();


  for (let i = currentYear; i > 1950; i--) {
    const season = await seasonsService.getSeason(i);
    //console.log(season);
    seasonsView.render(season);
  }
};

export default { init };
