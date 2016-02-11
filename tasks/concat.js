'use strict';

module.exports = function concat(grunt) {
    // Load task
    grunt.loadNpmTasks('grunt-contrib-concat');

    return {       
        distLibsCss: {
            src: ['build/libs/**/*.css'],
            dest: 'dist/libs/vendor.min.css',
        },
        distAppCss: {
            src: ['build/contents/css/*.css'],
            dest: 'dist/contents/css/app.min.css',
        }
    };
};