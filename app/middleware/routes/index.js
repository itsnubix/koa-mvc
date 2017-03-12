'use strict';

const _ = require('lodash');
const Router = require('koa-router');
const logService = require('../../services/logService');

module.exports = () => {
  const router = new Router();

  KoaConfig.routeDetails = {};
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
          // Setup redirects to remove trailing slash from get requests
          if (url !== '/' && (verb === 'get' || verb === 'all')) {
            router[verb](url + '/', async function redirect(context, next) {
              if (context.status === 301 || context.status === 302 || context.originalUrl === url) {
                await next();
              } else {
                context.redirect(url);
                context.status = 301;
              }
            });
          }

          router[verb](url, actionInstance);

          // Trim "Controller" off the end of the controllerPath
          KoaConfig.routeDetails[url] = {
            controller: controllerPath.slice(0, -10).toLowerCase(),
            action,
          };
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
