'use strict';

const statusCode = 404;
const logService = require('../../services/logService');

module.exports = async function response(context, next) {
  await next();

  if (context.status !== statusCode) {
    return;
  }

  context.body = {
    ok: false,
    url: context.originalUrl,
  };
  context.status = statusCode;

  const isAjax = context.request.get('X-Requested-With') === 'XMLHttpRequest';
  const prefersHtml = context.accepts('html');
  const acceptsJson = context.accepts('json', 'text');
  const preferJson = isAjax || !prefersHtml || (acceptsJson && context.is('json'));
  if (!preferJson) {
    try {
      context.state.data = context.state.data || null;
      await context.render(`${statusCode}`);
      // HTML rendering will set status to 200 if rendered correctly.
      // Reset to original status after rendering html
      context.status = statusCode;
    } catch (ex) {
      logService.error(ex, {
        req: context.req,
      });
    }
  }
};
