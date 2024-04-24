import filmService from '/js/service/filmService.js';
import filmView from '/js/view/filmView.js';

async function init() {
  const films = await filmService.getFilms();
  filmView.render(films);
};

export default { init };
