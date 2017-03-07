'use strict';

const _ = require('lodash');
const path = require('path');

const nodeEnv = process.env.NODE_ENV || 'development';
const environmentConfig = require('./env');
const log = require('./log');
const policies = require('./policies');
const routes = require('./routes');
const session = require('./session');

const environmentOverrides = environmentConfig[nodeEnv] || {};

module.exports = _.merge({
  path: path.join(__dirname, '..'),
  log,
  policies,
  routes,
  session,
}, environmentOverrides);
