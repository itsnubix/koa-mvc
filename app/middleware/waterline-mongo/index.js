'use strict';

const _ = require('lodash');
const fs = require('mz/fs');
const path = require('path');
const Waterline = require('waterline');
const sailsMongo = require('sails-mongo2');
const metricService = require('../../services/metricService');

module.exports = async() => {
  const startTime = process.hrtime();
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
        'sails-mongo2': sailsMongo,
      },
      connections: KoaConfig.datastores,
    };

    await new Promise((resolve, reject) => {
      waterline.initialize(waterlineConfig, (err, orm) => {
        if (err) {
          return reject(err);
        }

        _.each(orm.collections, (model) => {
          global[model.globalId || 'unknown'] = model;
        });

        return resolve();
      });
    });
  }
  metricService.duration('waterline init', startTime);
};
