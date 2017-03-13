'use strict';

/**
 * Compiles sass/scss files into CSS.
 *
 * For usage docs see:
 *    https://github.com/gruntjs/grunt-contrib-sass
 * @param {object} grunt - Grunt instance
 */
module.exports = (grunt) => {
  grunt.config.set('sass', {
    default: {
      options: {
        sourceMap: true,
      },
      files: [{
        expand: true,
        cwd: 'assets/styles/',
        src: ['global.sass', 'timeline.sass', 'patient_overview.sass', 'public/*.scss'],
        dest: '.tmp/public/styles/',
        ext: '.css',
      }],
    },
  });

  grunt.loadNpmTasks('grunt-sass');
};
