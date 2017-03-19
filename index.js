'use strict';

const startupTime = process.hrtime();

const Koa = require('koa');
const config = require('./config');

global.KoaConfig = config;

const logService = require('./app/services/logService');
const metricService = require('./app/services/metricService');
const middleware = require('./app/middleware');

(async function loadApplication() {
  const app = new Koa();
  await middleware.plugins.startup(app);
  app.use(middleware.middleware());
  app.listen(config.port);

  process.on('SIGINT', () => {
    (async function shutdown() {
      await middleware.plugins.shutdown();

      process.exit();
    }()).catch((ex) => {
      logService.error(ex);
      process.exit();
    })
  });

  logService.info(`Listening on port ${config.port}`);
  metricService.duration('application.startupTime', startupTime);
}()).catch((ex) => {
  logService.error(ex);
  throw ex;
});
