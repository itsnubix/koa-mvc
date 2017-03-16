'use strict';

const winston = require('winston');

module.exports = {
  port: 80,

  datastores: {
    default: {
      adapter: 'sails-mongo2',
      url: process.env.DATABASE_URL,
      poolSize: 5,
    },
  },

  librato: {
    email: process.env.LIBRATO_EMAIL,
    token: process.env.LIBRATO_TOKEN,
    prefix: 'production.',
  },

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
