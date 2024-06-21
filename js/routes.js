export default {
  home: {
    path: '/',
    controller: 'homeController'
  },
  circuits: {
    path: '/circuits',
    controller: 'circuitController'
  },
  circuitPage: {
    path: '/circuits/:id',
    controller: 'circuitController'
  },
  seasons: {
    path: '/seasons',
    controller: 'seasonsController'
  },
  seasonPage: {
    path: '/seasons/:id',
    controller: 'seasonsController'
  },
  drivers: {
    path: '/drivers',
    controller: 'driverController'
  },
  driverPage: {
    path: '/drivers/:id',
    controller: 'driverController'
  },
  about: {
    path: '/about',
    controller: 'aboutController'
  },
  currentPath: {
    path: '',
    controller: ''
  }
};
