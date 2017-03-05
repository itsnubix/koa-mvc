'use strict';

const startupTime = process.hrtime();

const Koa = require('koa');
const config = require('./config');

global.KoaConfig = config;

const logService = require('./app/services/logService');
const metricService = require('./app/services/metricService');
const middleware = require('./app/middleware');

const app = new Koa();
app.use(middleware());
app.listen(config.port);
logService.info(`Listening on port ${config.port}`);

metricService.duration('application.startupTime', startupTime);
