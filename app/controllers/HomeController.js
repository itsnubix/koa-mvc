'use strict';

module.exports = {
  index: async function index(context) {
    await context.render();
  },

  modernBrowser: async (context) => {
    await context.render();
  },
};
