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

module.exports = function(grunt) {
  grunt.config.set('bower', {
    dev: {
        dest: '.tmp/public',
        js_dest: '.tmp/public/js/dependencies',
        css_dest: '.tmp/public/styles'
    }
  });

  grunt.loadNpmTasks('grunt-bower');

};