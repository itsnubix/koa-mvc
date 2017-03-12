'use strict';

module.exports = {
  port: 1339,

  datastores: {
    default: {
      adapter: 'sails-mongo2',
      url: process.env.DATABASE_URL || 'mongodb://localhost:27017/mpirik',
      poolSize: 5,
    },
  },

  views: {
    cache: false,
  },
};
