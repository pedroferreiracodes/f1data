import driverService from '../service/driverService.js';
import driversView from '../view/driversView.js';

async function init() {
  driversView.clear();
  const drivers = await driverService.getDrivers();
  driversView.render(drivers);
};

export default { init };
