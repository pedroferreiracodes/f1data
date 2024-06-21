import circuitService from '../service/circuitService.js';
import circuitsView from '../view/circuitsView.js';
import circuitPgView from '../view/circuitPgView.js';




async function init(params) {

  if (params && params.id) {
    circuitPgView.clear();
    const circuit = await circuitService.getCircuit(params.id);
    circuitPgView.render(circuit)
  } else {
    circuitsView.clear();
    const circuits = await circuitService.getCircuits();
    circuitsView.render(circuits);
  }
};

export default { init };
