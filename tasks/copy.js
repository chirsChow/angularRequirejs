'use strict';


module.exports = function copy(grunt) {
    // Load task
    grunt.loadNpmTasks('grunt-contrib-copy');

    // Options
    return {
        main: {
            expand: true,
            src: ['*.html'],
            dest: 'build/',
            filter: 'isFile'
        },
        source: {
            expand: true,
            src: ['src/**/*.*'],
            dest: 'build/'
        },
        contents: {
            expand: true,
            src: ['contents/**/*.*'],
            dest: 'build/'
        },
        libs: {
            files: [
                // angular core libs
                 //{ expand: true, flatten: true, src: ['../js/third-party/angular/angular.js'], dest: 'build/libs/angular' },
                 { expand: true, flatten: true, src: ['../js/third-party/angular/*.min.js'], dest: 'build/libs/angular' },
                 //{ expand: true, flatten: true, src: '../js/third-party/angular/angular-route.min.js', dest: 'build/libs/angular' },
                 //{ expand: true, flatten: true, src: '../js/third-party/angular/angular-resource.min.js', dest: 'build/libs/angular' },
                 //{ expand: true, flatten: true, src: '../js/third-party/angular/angular-sanitize.min.js', dest: 'build/libs/angular' },
                 //{ expand: true, flatten: true, src: '../js/third-party/angular/angular-cookies.min.js', dest: 'build/libs/angular' },
                 //{ expand: true, flatten: true, src: '../js/third-party/angular/angular-animate.min.js', dest: 'build/libs/angular' },

                 { expand: true, flatten: true, src: '../js/third-party/angular-route-segment/angular-route-segment.min.js', dest: 'build/libs/angular' },
                // { expand: true, flatten: true, src: '../css/third-party/bootstrap/bootstrap.min.css', dest: 'build/libs/bootstrap' },

                // angular-ui
                 { expand: true, flatten: true, src: '../js/third-party/angular-ui-router/angular-ui-router.min.js', dest: 'build/libs/ui-router' },
                 { expand: true, flatten: true, src: '../js/third-party/angular-bootstrap/ui-bootstrap.min.js', dest: 'build/libs/angular-bootstrap' },
                 { expand: true, flatten: true, src: '../js/third-party/angular-bootstrap/ui-bootstrap-tpls.min.js', dest: 'build/libs/angular-bootstrap' },
                 { expand: true, flatten: true, src: '../js/third-party/angular-bootstrap/ui-bootstrap-csp.css', dest: 'build/libs/angular-bootstrap' },

                 { expand: true, flatten: true, src: '../js/third-party/ui-grid/*', dest: 'build/libs/ui-grid' },
                 { expand: true, flatten: true, src: '../js/third-party/ui-grid/images/lines.png', dest: 'build/libs/ui-grid/images/' },
                 { expand: true, flatten: true, src: '../js/third-party/angular-tooltips/angular-tooltips.min.css', dest: 'build/libs/angular-tooltips' },
                 { expand: true, flatten: true, src: '../js/third-party/angular-tooltips/angular-tooltips.min.js', dest: 'build/libs/angular-tooltips' },


                //external libs              
                { expand: true, flatten: true, src: '../js/third-party/pdfmake/pdfmake.min.js', dest: 'build/libs/pdfmake' },
                { expand: true, flatten: true, src: '../js/third-party/pdfmake/vfs_fonts.js', dest: 'build/libs/pdfmake' },
                { expand: true, flatten: true, src: '../js/third-party/lodash/lodash.min.js', dest: 'build/libs/lodash' },
                { expand: true, flatten: true, src: '../angular/node_modules/requirejs/require.js', dest: 'build/libs/requirejs' },
                { expand: true, flatten: true, src: '../angular/node_modules/q/q.js', dest: 'build/libs/' }

                //application css


            ]
        },
        dist: {
            files: [
                {
                    expand: true,
                    src: ['*.html'],
                    dest: 'dist/',
                    filter: 'isFile'
                }, {
                    expand: true,
                    cwd: './build/src/',
                    src: ['main.js', 'config.js'],
                    dest: 'dist/src',
                    filter: 'isFile'                
                },
                 {
                     expand: true,
                     cwd: './build/libs/',
                     src: ['**/*.js'],
                     dest: 'dist/libs'
                 }
                 //},
                 //{
                 //    expand: true,
                 //    cwd: 'build/contents/',
                 //    src: ['**/*'],
                 //    dest: 'dist/contents'
                 //}
            ]
        
        },
        options: {
            ignore: [
                'tasks/*',
                'tests/*'
            ]
        }
    };
};
