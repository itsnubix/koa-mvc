'use strict';

const _ = require('lodash');

const nodeEnv = process.env.NODE_ENV || 'development';
const environmentConfig = require('./env');
const log = require('./log');
const policies = require('./policies');
const routes = require('./routes');
const session = require('./session');

const environmentOverrides = environmentConfig[nodeEnv] || {};

module.exports = _.merge({
  log,
  policies,
  routes,
  session,
}, environmentOverrides);
