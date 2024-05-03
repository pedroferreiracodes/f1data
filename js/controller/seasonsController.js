import seasonsService from '/js/service/seasonsService.js';
import seasonsView from '/js/view/seasonsView.js';

async function init() {
  const seasons = await seasonsService.getSeasons();
  seasonsView.render(seasons);
};

export default { init };
