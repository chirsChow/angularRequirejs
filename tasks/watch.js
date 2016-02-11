'use strict';

module.exports = function watch(grunt) {
    // Load task
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Options
    return {
        scripts: {
            files: [
                'src/**',
                'tests/**',
                'tasks/**',
                'gruntFile.js',
                'index.html'
            ],
            tasks: ['dev'],
            options: {
                spawn: false,
            }
        },
        options: {
            livereload: {
                host: 'localhost',
                port: 9000
            }
        }
    };
};
