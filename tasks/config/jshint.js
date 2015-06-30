/**
 * Copy bower files to .tmp pubic file
 *
 * ---------------------------------------------------------------
 *
 * This grunt task is configured to clean out the contents in the .tmp/public of your
 * sails project.
 *
 * For usage docs see:
 * 		https://github.com/gruntjs/grunt-contrib-clean
 */
module.exports = function (grunt) {
  grunt.config.set('jshint', {
    options: { reporter: require('jshint-stylish') },
    all: {
      src: [
        'tasks/**/*.js',
        'assets/js/app/*.js',
        'assets/js/general/*.js',
        'api/**/*.js',
        'config/**/*.js'
      ]
    },
    assets: {
      src: [
        'assets/js/app/*.js',
        'assets/js/general/*.js'
      ]
    },
    backend: {
      src: [
        'tasks/**/*.js',
        'api/**/*.js',
        'config/**/*.js'
      ]
    }
  });
  grunt.loadNpmTasks('grunt-contrib-jshint');
};