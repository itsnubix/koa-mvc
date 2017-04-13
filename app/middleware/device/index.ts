'use strict';
import {Context} from "../../types/koaMvc/index";

const device = require('device');

module.exports = () => {
  return async function deviceDetection(context: Context, next: () => void) {
    const useragent = context.request.headers['user-agent'];
    const requestDevice = device(useragent, {
      parseUserAgent: true,
    });

    context.request.device = {
      parser: requestDevice.parser,
      type: requestDevice.type,
      name: requestDevice.model,
    };

    await next();
  };
};
