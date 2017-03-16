'use strict';

const compose = require('koa-compose');
const responseTime = require('./responseTime');
const ejs = require('./ejs');
const waterlineMongo = require('./waterline-mongo');
const librato = require('./librato');
const policies = require('./policies');
const routes = require('./routes');
const helmet = require('koa-helmet');
const cors = require('kcors');

module.exports.plugins = {
  startup: async function startupPlugins(app) {
    return Promise.all([
      ejs.startup(app),
      waterlineMongo.startup(app),
      librato.startup(app),
    ]);
  },
  shutdown: async function shutdownPlugins() {
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
    routes(),
  ]);
};
