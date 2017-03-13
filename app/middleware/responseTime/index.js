'use strict';

const metricService = require('../../services/metricService');

module.exports = async function responseTime(context, next) {
  const start = process.hrtime();
  await next();
  metricService.duration(`${context.method} ${context.url}`, start);
};
