'use strict';

const helmet = require('koa-helmet');
const modernBrowser = require('./modernBrowser');

module.exports = {
  noCache: helmet.noCache,
  modernBrowser,
};
