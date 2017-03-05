'use strict';

const compose = require('koa-compose');
const responseTime = require('./responseTime');
const routes = require('./routes');

module.exports = () => {
  return compose([
    responseTime,
    routes(),
  ]);
};
