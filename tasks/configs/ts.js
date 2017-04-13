'use strict';

/**
 * Transpiles typescript files to javascript.
 *
 * For usage docs see:
 *    https://github.com/gruntjs/grunt-contrib-sass
 * @param {object} grunt - Grunt instance
 */
module.exports = (grunt) => {
  grunt.config.set('ts', {
    default: {
      tsconfig: true,
      files: [{
        expand: true,
        src: ['**/*.ts', "!node_modules/**"],
        dest: '.build/',
      }],
    },
  });

  grunt.loadNpmTasks('grunt-ts');
};
