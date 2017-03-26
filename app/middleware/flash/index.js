'use strict';

const _ = require('lodash');

module.exports = () => {
  return async function flash(context, next) {
    context.state.flash = context.session.flash || {};
    context.flash = function saveFlash(severity, message) {
      context._flash = context._flash || {};
      context._flash[severity] = context._flash[severity] || [];

      if (_.isArray(message)) {
        context._flash[severity].push(...message);
      } else {
        context._flash[severity].push(message);
      }
    };

    await next();

    if (_.isEmpty(context._flash)) {
      delete context.session.flash;
    } else {
      context.session.flash = context._flash;
    }
  };
};
