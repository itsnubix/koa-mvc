'use strict';

const compose = require('koa-compose');
const responseTime = require('./responseTime');
const ejs = require('./ejs');
const waterlineMongo = require('./waterline-mongo');
const routes = require('./routes');

module.exports = (app) => {
  return compose([
    responseTime,
    ejs(app),
    waterlineMongo(),
    routes(),
  ]);
};
