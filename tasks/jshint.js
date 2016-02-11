'use strict';


module.exports = function jshint(grunt) {
    // Load task
    grunt.loadNpmTasks('grunt-contrib-jshint');

    // Options
    return {
        files: [
            'gruntFile.js',
            'tasks/*.js',
            'src/**/*.js'
        ],
        options: {
            jshintrc: '.jshintrc'
        }
    };
};
