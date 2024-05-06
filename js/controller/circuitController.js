import circuitService from './service/circuitService.js';
import circuitsView from './view/circuitsView.js';

async function init() {
  const circuits = await circuitService.getCircuits();
  circuitsView.render(circuits);
};

export default { init };
