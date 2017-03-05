'use strict';

const winston = require('winston');

module.exports = {
  port: 80,

  log: {
    logger: new winston.Logger({
      level: 'info',
      exitOnError: false,
      transports: [
        new winston.transports.Console({
          timestamp: true,
        }),
      ],
    }),
  },

};
