'use strict';

const _ = require('lodash');
const Router = require('koa-router');
const logService = require('../../services/logService');

module.exports = () => {
  const router = new Router();

  for (const routeKey of _.keys(KoaConfig.routes)) {
    const [verb, url] = routeKey.split(' ');
    const routeValue = KoaConfig.routes[routeKey];
    if (routeValue[0] === '/') {
      router.redirect(url, routeValue, 301);
    } else {
      const [controllerPath, action] = routeValue.split('.');
      const controller = require(`../../controllers/${controllerPath}`);
      if (controller) {
        const actionInstance = controller[action];
        if (actionInstance) {
          router[verb](url, actionInstance);
        } else {
          logService.warn(`Unable to find controller action for route: ${routeKey}`);
        }
      } else {
        logService.warn(`Unable to find controller for route: ${routeKey}`);
      }
    }
  }

  return router.routes();
};
