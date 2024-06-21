import seasonsService from '../service/seasonsService.js';
import seasonsView from '../view/seasonsView.js';
import seasonPgView from '../view/seasonPgView.js';




async function init(params) {

  if (params && params.id) {
    seasonPgView.clear();
    const season = await seasonsService.getSeason(params.id);
    seasonPgView.render(season)
    console.log(season);
  } else {
    seasonsView.clear();
    const seasons = await seasonsService.getSeasons();
    seasonsView.render(seasons);
  }
};

export default { init };
