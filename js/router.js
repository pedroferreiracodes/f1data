import routes from './js/routes.js'

function setCurrentRoute({ path, controller }) {

  routes.currentPath.path = path;
  routes.currentPath.controller = controller;

}

async function launchController(controllerName) {

  const module = await import(`./controller/${controllerName}.js`)
  module.default.init();
}

function navigate(path) {

  if (path === routes.currentPath.path) {
    return;
  }

  const routeKey = Object.keys(routes).find(key => routes[key].path === path);
  const route = routes[routeKey] || routes.home;

  setCurrentRoute(route);
  launchController(route.controller)

}

function getPath(urlStr) {
  return new URL(urlStr).hash.slice(1);
}

function navigateOnHashChange() {
  addEventListener('hashchange', (e) => {
    const path = getPath(e.newURL);
    navigate(path);
  })
}

function init() {

  window.location.hash = window.location.hash || routes.home.path;

  navigate(getPath(window.location.href));
  navigateOnHashChange();
}

export default { init };
