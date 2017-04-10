'use strict';

const _ = require('lodash');
const koaEjs = require('koa-ejs');
const path = require('path');
const minify = require('html-minifier').minify;

module.exports = {
  startup: async function ejsPluginStartup(app) {
    const viewPath = path.join(KoaConfig.path, 'views');

    koaEjs(app, _.merge({}, KoaConfig.views, {
      root: viewPath,
      viewExt: 'ejs',
    }));

    // override the render function to auto-fill the view name based on controller and action
    const render = app.context.render;
    app.context.render = async function ejsRender(view, options) {
      const context = this;
      let viewName = view;
      let viewOptions = options;
      if (!view || _.isObject(view)) {
        viewOptions = view;

        const routeInfo = KoaConfig.routeDetails[context.path];
        if (routeInfo) {
          viewName = path.join(routeInfo.controller, routeInfo.action);
        }
      }

      await render.apply(context, [viewName, viewOptions]);
      context.body = minify(context.body, KoaConfig.ejsMinifyOptions);
    };
  },
};
