'use strict';


module.exports = function less(grunt) {
    // Load task
    grunt.loadNpmTasks('grunt-contrib-less');

    // Options
    return {
        build: {
            options: {
                cleancss: false,
                compress : true
            },
            files: {
                'contents/css/base.css': 'src/less/base.less',
                'contents/css/common.css': 'src/less/common.less',
                'contents/css/modal.css': 'src/less/modal.less',
                'contents/css/gridFilters.css': 'src/directives/**/gridFilters.less',
                'contents/css/gridResults.css': 'src/directives/**/gridResults.less',
                'contents/css/report.css': 'src/modules/**/report.less'
            }
        }
    };
};
