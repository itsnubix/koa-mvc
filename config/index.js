'use strict';

const _ = require('lodash');

const environment = process.env.NODE_ENV || 'development';
// eslint-disable-next-line import/no-dynamic-require
const environmentConfig = require(`./env/${environment}`);
const log = require('./log');
const policies = require('./policies');
const routes = require('./routes');
const session = require('./session');

module.exports = _.merge({
  path: process.cwd(),
  environment,
  log,
  policies,
  routes,
  session,
  views: {},
  ejsMinifyOptions: {
    collapseWhitespace: true,
    removeComments: true,
  },
}, environmentConfig);
