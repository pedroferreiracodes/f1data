import driverService from '../service/driverService.js';
import driversView from '../view/driversView.js';
import driverPgView from '../view/driverPgView.js';

let completeDriversArray = [];


async function init(params) {

  if (params && params.id) {
    driverPgView.clear();
    const driver = await driverService.getDriver(params.id);
    driverPgView.render(driver)
  } else {
    driversView.clear();
    const drivers = await driverService.getDrivers();
    driversView.render(drivers);
  }
};

export default { init };
