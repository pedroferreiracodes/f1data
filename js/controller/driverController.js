import driverService from '/js/service/driverService.js';
import driversView from '/js/view/driversView.js';

async function init() {
  const drivers = await driverService.getDrivers();
  driversView.render(drivers);
};

export default { init };
