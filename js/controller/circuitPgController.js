import circuitService from '/js/service/circuitService.js';
import circuitPgView from '/js/view/circuitPgView.js';

async function init() {
  const currentUrl = window.location.href;
  const cIdArr = currentUrl.split("/");
  const cId = cIdArr[5];
  const circuit = await circuitService.getCircuit(cId);
  console.log(circuit);
  circuitPgView.render(circuit);
};

export default { init };
