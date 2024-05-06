import seasonsService from './service/seasonsService.js';
import seasonsView from './view/seasonsView.js';

async function init() {
  const seasons = await seasonsService.getSeasons();
  seasonsView.render(seasons);
};

export default { init };
