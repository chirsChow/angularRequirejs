'use strict';

module.exports = function requirejs(grunt) {
    // Load task
    grunt.loadNpmTasks('grunt-contrib-requirejs');

    return {
        compile: {
            options: {
                logLevel: 0,
                baseUrl: 'build',
                mainConfigFile: 'src/config.js',
                wrapShim: true,
                optimize: 'none', //uglify
                name:'src/_module',
                out: './dist/src/_module.js',
                exclude: [
                    'libs/angular/angular.min',
                    'libs/angular/angular-route.min',
                    'libs/angular/angular-animate.min',
                    'libs/angular/angular-cookies.min',
                    'libs/ui-router/angular-ui-router.min',
                    'libs/ui-grid/ui-grid-unstable',
                    'libs/angular-bootstrap/ui-bootstrap.min',
                    'libs/angular-bootstrap/ui-bootstrap-tpls.min',
                    'libs/lodash/lodash.min',
                    'libs/pdfmake/pdfmake.min',    
                    'libs/angular-tooltips/angular-tooltips.min',
                    'libs/q'
                ]
            }
        }
    };
};