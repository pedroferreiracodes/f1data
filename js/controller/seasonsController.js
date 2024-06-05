import seasonsService from '../service/seasonsService.js';
import seasonsView from '../view/seasonsView.js';






async function init() {

  seasonsView.clear();

  const date = new Date();
  let currentYear = date.getFullYear();


  let shouldStop = false;



  (async () => {
    for (let i = currentYear; i > 1950; i--) {
      if (shouldStop) {
        break;
      }

      try {
        const season = await seasonsService.getSeason(i);
        
        window.addEventListener("hashchange", () => {
          shouldStop = true;
        });

        seasonsView.render(season);
      } catch (error) {
        console.error(`Failed to fetch season for year ${i}:`, error);
      }
    }
  })();
}

export default { init };
