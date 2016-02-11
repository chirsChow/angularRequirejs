'use strict';

module.exports = function karma(grunt) {
    // Load task
    grunt.loadNpmTasks('grunt-karma');

    // Options
    return {
        unit: {
            options: {
                configFile: 'tests/config/karma.conf.js',
                'keepalive': true
            }
        },
        integration: {
            options: {
                configFile: 'tests/config/karma.conf.js',
                keepalive: false,
                singleRun: true
            }
        },
        coverage: {
            configFile: 'tests/config/karma-coverage.conf.js',
            singleRun: true
        }
    };
};
