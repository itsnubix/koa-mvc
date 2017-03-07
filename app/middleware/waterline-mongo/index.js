'use strict';

const _ = require('lodash');
const fs = require('mz/fs')
const path = require('path');
const Waterline = require('waterline');

module.exports = () => {
  // Setup waterline in an IIFE so that it only happens once at time of application launch, not every request
  (async function setupWaterline() {
    if (KoaConfig.datastores) {
      const waterline = new Waterline();

      const modelsPath = path.join(KoaConfig.path, '/app/models');
      const files = await fs.readdir(modelsPath);

      for (const file of files) {
        const fileBasename = path.basename(file, '.js');
        /* eslint-disable global-require, import/no-dynamic-require */
        const schema = require(`${modelsPath}/${fileBasename}`);
        /* eslint-enable global-require, import/no-dynamic-require */

        const model = _.merge({
          identity: fileBasename.toLowerCase(),
          globalId: fileBasename,
          tableName: fileBasename.toLowerCase(),
          connection: 'default',
          migrate: 'alter',
          dynamicFinders: false,
        }, schema);

        waterline.loadCollection(Waterline.Collection.extend(model));
      }

      const waterlineConfig = {
        adapters: {
          'sails-mongo2': require('sails-mongo2'),
        },
        connections: KoaConfig.datastores,
      };

      await new Promise((resolve, reject) => {
        waterline.initialize(waterlineConfig, (err, orm) => {
          if (err) {
            return reject(err);
          }

          _.each(orm.collections, (model) => {
            global[model.globalId] = model;
          });

          return resolve();
        });
      });
    }
  }()).catch((ex) => {
    throw ex;
  });

  // The work of this middleware was done above, so just return a blank
  // method to satisfy the per request middleware needs
  return async (context, next) => {
    await next();
  };
};
