import driverService from '../service/driverService.js';
import driversView from '../view/driversView.js';

async function init() {
  driversView.clear();
  const drivers = await driverService.getDrivers();
  driversView.render(drivers);

  drivers.forEach(element => {
    driverService.getDriverRaceWins(element)

  });

  driversView.render(drivers);

};

export default { init };
