'use strict';

const compose = require('koa-compose');
const responseTime = require('./responseTime');
const ejs = require('./ejs');
const waterlineMongo = require('./waterline-mongo');
const librato = require('./librato');
const helmet = require('koa-helmet');
const cors = require('kcors');
const policies = require('./policies');
const routes = require('./routes');
const staticFiles = require('./staticFiles');
const response = require('./response');

module.exports.plugins = {
  startup: (app) => {
    return Promise.all([
      ejs.startup(app),
      waterlineMongo.startup(app),
      librato.startup(app),
    ]);
  },
  shutdown: () => {
    return Promise.all([
      librato.shutdown(),
    ]);
  },
};

module.exports.middleware = () => {
  return compose([
    responseTime,
    helmet(),
    cors(),
    policies(),
    response(),
    routes(),
    staticFiles(),
  ]);
};
