'use strict';

const compose = require('koa-compose');
const responseTime = require('./responseTime');
const ejs = require('./ejs');
const waterlineMongo = require('./waterline-mongo');
const routes = require('./routes');

module.exports.plugins = async (app) => {
  return Promise.all([
    ejs(app),
    waterlineMongo(app)
  ]);
};

module.exports.middleware = () => {
  return compose([
    responseTime,
    routes(),
  ]);
};
