import driverService from '../service/driverService.js';
import driversView from '../view/driversView.js';

let completeDriversArray = [];


async function init() {
  driversView.clear();
  const drivers = await driverService.getDrivers();
  driversView.render(drivers);
};

export default { init };
