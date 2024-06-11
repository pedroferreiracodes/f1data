import driverService from '../service/driverService.js';
import driversView from '../view/driversView.js';

let completeDriversArray = [];


async function init() {
  driversView.clear();
  const drivers = await driverService.getDrivers();
  driversView.render(drivers);

  for (const driver of drivers) {
    const completeDriver = await driverService.getDriverRaceWins(driver);
    completeDriversArray.push(completeDriver);
    const currentLoadingPercent = getLoadPercentage(drivers.length, completeDriversArray.length)
    console.log(currentLoadingPercent);
  }

  driversView.render(completeDriversArray);

};

function getLoadPercentage (total, soFar){
  return (soFar*100)/total
}

export default { init };
