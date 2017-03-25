'use strict';

const Redis = require('ioredis');

const redisClient = new Redis({
  host: process.env.REDIS_HOST || 'localhost',
  port: process.env.REDIS_PORT || 6379,
});

module.exports = {
  port: 1339,

  datastores: {
    default: {
      adapter: 'sails-mongo2',
      url: process.env.DATABASE_URL || 'mongodb://localhost:27017/koa-mvc',
      poolSize: 5,
    },
  },

  cache: {
    client: redisClient,
  },
};
