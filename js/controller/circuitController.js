import circuitService from '/js/service/circuitService.js';
import circuitsView from '/js/view/circuitsView.js';

async function init() {
  const circuits = await circuitService.getCircuits();
  circuitsView.render(circuits);
};

export default { init };
