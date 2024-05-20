import circuitService from '../service/circuitService.js';
import circuitsView from '../view/circuitsView.js';

async function init() {

  circuitsView.clear();

  const circuits = await circuitService.getCircuits();
  circuitsView.render(circuits);
};

export default { init };
