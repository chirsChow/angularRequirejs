'use strict';


module.exports = function injector(grunt) {
    // Load task
    grunt.loadNpmTasks('grunt-injector');

    // Options
    return {
        options: {
            ignorePath: [ 'tests/', 'tasks/'],
            min: false,
            relative: false,
            addRootSlash: './',
            transform: function (file, i, length) {

                var dir = file.split('/')[1];

                if (file.indexOf('.css') === -1) {
                    if (file.indexOf('require') !== -1) {
                        return '<script src="/angular' + file + '" data-main="/angular/' + dir + '/src/main" ></script>';
                    }
                    return '<script src="/angular' + file + '"  ></script>';
                } else {
                    return '<link href="/angular' + file + '" rel="stylesheet" />';
                }
            }
        },
        local_dependencies: {
            files: {
                'build/index.html': [
                                    'build/libs/**/*min.css',
                                    'build/libs/angular-bootstrap/*.css',
                                    'build/contents/css/*.css',
                                    
                                    'build/libs/requirejs/require.js',

                                    //'build/src/**/*.css'
                                    //'build/src/**/*.js'
                                ]
            }
        },
        prod_dependencies: {
            files: {
                'dist/index.html': [
                                    'dist/libs/**/*min.css',
                                    'dist/libs/angular-bootstrap/*.css',
                                    'dist/contents/css/*.css',
                                    
                                    'dist/libs/requirejs/require.js',
                                    //'build/src/**/*.css'
                                    //'build/src/**/*.js'
                ]
            }
        }


    };
};
