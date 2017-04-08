'use strict';

const bodyParser = require('koa-body-parser');
const helmet = require('koa-helmet');
const modernBrowser = require('./modernBrowser');

module.exports = {
  bodyParser: bodyParser(),
  noCache: helmet.noCache(),
  modernBrowser: modernBrowser(),
};
