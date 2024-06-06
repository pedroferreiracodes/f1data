import homeView from '../view/homeView.js';
import seasonsService from '../service/seasonsService.js';


async function init() {

  homeView.clear();

  const date = new Date();
  const currentYear = date.getFullYear();
  const currentSeason = await seasonsService.getSeason(currentYear);
  homeView.render(currentSeason);

};

export default { init };