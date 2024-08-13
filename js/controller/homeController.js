import homeView from '../view/homeView.js';
import seasonsService from '../service/seasonsService.js';


async function init() {

  homeView.clear();

  const date = new Date();
  const currentYear = date.getFullYear();
  const currentConstructorChampionship = await seasonsService.getConstructorChampionship(currentYear);
  const currentDriverChampionship = await seasonsService.getDriverChampionship(currentYear);
  const lastWeekend = await seasonsService.getLastWeekend();
  const nextWeekend = await seasonsService.getNextWeekend(currentConstructorChampionship.round);
  console.log(nextWeekend);
  homeView.render(currentConstructorChampionship, currentDriverChampionship, lastWeekend, nextWeekend);

};

export default { init };