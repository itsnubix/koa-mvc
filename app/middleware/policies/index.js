'use strict';

const _ = require('lodash');
const Router = require('koa-router');
const policies = require('../../policies');
const logService = require('../../services/logService');

module.exports = () => {
  const router = new Router();

  for (const routeKey of _.keys(KoaConfig.policies)) {
    const [verb, url] = routeKey.split(' ');
    for (const routePolicyName of KoaConfig.policies[routeKey]) {
      const policy = policies[routePolicyName];

      if (policy) {
        router[verb](url, policy());
      } else {
        logService.warn(`Unable to find ${routePolicyName} policy for route: ${routeKey}`);
      }
    }
  }

  return router.routes();
};
