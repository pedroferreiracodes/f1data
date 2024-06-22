import routes from '../routes.js';

function setCurrentRoute({ path, controller }) {

  routes.currentPath.path = path;
  routes.currentPath.controller = controller;

}

async function launchController(controllerName, params) {

  const module = await import(`./controller/${controllerName}.js`)
  module.default.init(params);
}

function navigate(path) {

  if (path === routes.currentPath.path) {
    return;
  }

  let matchedRoute = null;
  let params = {};

  Object.keys(routes).forEach(key => {
    const route = routes[key];
    const routePattern = route.path.replace(/:\w+/g, '([^/]+)');
    const regex = new RegExp(`^${routePattern}$`);
    const match = path.match(regex);


    if (match) {
      matchedRoute = route;
      const keys = (route.path.match(/:\w+/g) || []).map(k => k.substring(1));
      keys.forEach((key, index) => {
        params[key] = match[index + 1];
      });
    }
  });

  if (!matchedRoute) {
    matchedRoute = routes.home;
  }

  setCurrentRoute(matchedRoute);
  launchController(matchedRoute.controller, params);

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
