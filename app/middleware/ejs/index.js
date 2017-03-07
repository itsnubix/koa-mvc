'use strict';

const render = require('koa-ejs');
const path = require('path');

module.exports = (app) => {
  const viewPath = path.join(KoaConfig.path, 'views');
  render(app, {
    root: viewPath,
    viewExt: 'ejs',
  });

  // The work of this middleware was done above with the render function, so just return a blank
  // method to satisfy the per request middleware needs
  return async (context, next) => {
    await next();
  };
};
