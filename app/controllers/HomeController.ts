'use strict';
import {Context} from "../types/koaMvc/index";

module.exports = {
  async index(context: Context) {
    await context.render();
  },

  async modernBrowser(context: Context) {
    await context.render();
  },
};
