'use strict';

const compose = require('koa-compose');
const responseTime = require('./responseTime');
const ejs = require('./ejs');
const waterlineMongo = require('./waterline-mongo');
const policies = require('./policies');
const routes = require('./routes');
const helmet = require('koa-helmet');
const cors = require('kcors');

module.exports.plugins = async (app) => {
  return Promise.all([
    ejs(app),
    waterlineMongo(app)
  ]);
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
