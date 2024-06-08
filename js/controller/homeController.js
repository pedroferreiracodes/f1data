import homeView from '../view/homeView.js';
import seasonsService from '../service/seasonsService.js';


async function init() {

  homeView.clear();

  const date = new Date();
  const currentYear = date.getFullYear();
  const currentConstructorChampionship = await seasonsService.getConstructorChampionship(currentYear);
  const currentDriverChampionship = await seasonsService.getDriverChampionship(currentYear)
  homeView.render(currentConstructorChampionship, currentDriverChampionship);

};

export default { init };