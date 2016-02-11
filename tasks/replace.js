'use strict';

module.exports = function replace(grunt) {
    // Load task
    grunt.loadNpmTasks('grunt-replace');

    // Options
    return {
        dev: {
            options: {
                patterns: [
                  {
                      match: '/build',
                      replacement: '/build'
                  }
                ]
            },
            files: [             
              { expand: true, flatten: true, src: ['src/config.js'], dest: 'build/src' }
            ]
        },
        dist: {
            options: {
                patterns: [
                  {
                      match: '/build',
                      replacement: '/dist'
                  }
                ]
            },
            files: [
              { expand: true, flatten: true, src: ['src/config.js'], dest: 'dist/src' }
            ]
        }
    };
};
