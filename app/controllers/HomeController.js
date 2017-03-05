'use strict';

module.exports = {
  index: async function index(context) {
    await context.render('home/index');
  },
};
