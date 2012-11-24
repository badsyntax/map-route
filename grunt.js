/*global module:false*/
module.exports = function(grunt) {

  grunt.initConfig({
    lint: {
      files: ['grunt.js', 'httpdocs/assets/js/**/*.js']
    },
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        eqnull: true,
        browser: true
      },
      globals: {
        jQuery: true,
        $: true,
        console: false,
        google: true,
        ko: true,
        App: true
      }
    },
    uglify: {}
  });

  grunt.registerTask('default', 'lint');
};