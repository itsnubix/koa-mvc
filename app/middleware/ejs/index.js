'use strict';

const render = require('koa-ejs');
const path = require('path');

module.exports = (app) => {
  const viewPath = path.join(__dirname, '../../../views');
  render(app, {
    root: viewPath,
    viewExt: 'ejs',
  });

  // The work of this middleware was done above with the render function, so just return a blank
  // method to satisfy the koa middleware needs
  return async (context, next) => {
    await next();
  };
};
