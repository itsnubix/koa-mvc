'use strict';

const _ = require('lodash');
const koaEjs = require('koa-ejs');
const path = require('path');

module.exports = async (app) => {
  const viewPath = path.join(KoaConfig.path, 'views');

  koaEjs(app, {
    root: viewPath,
    viewExt: 'ejs',
  });

  // override the render function to auto-fill the view name based on controller and action
  const render = app.context.render;
  app.context.render = async function ejsRender(view, options) {
    const context = this;
    if (!view || _.isObject(view)) {
      options = view;

      const routeInfo = KoaConfig.routeDetails[context.originalUrl];
      if (routeInfo) {
        view = path.join(routeInfo.controller, routeInfo.action);
      }
    }

    return render.apply(context, [view, options]);
  };

};
