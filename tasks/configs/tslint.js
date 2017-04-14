'use strict';

/**
 * Lints the javascript source code
 * @param {object} grunt - Grunt instance
 */
module.exports = (grunt) => {

  grunt.config.set('tslint', {
    default: {
      files: [{
        expand: true,
        cwd: './',
        src: ['app/**/*.ts', 'tasks/**/*.ts', 'test/**/*.ts', 'assets/js/**/*.ts', '!assets/js/{libs,dependencies}/**/*.ts', 'config/**/*.ts'],
      }],
      options: {
        cache: true,
        fix: true,
      },
    },
  });

  grunt.loadNpmTasks('grunt-tslint');
  grunt.loadNpmTasks('grunt-staged2');
};
