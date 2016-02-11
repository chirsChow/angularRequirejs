'use strict';

module.exports = function html2js(grunt) {
    // Load task
    grunt.loadNpmTasks('grunt-html2js');

    return {
        gridFilters: {
            options: {
                //rename: function (moduleName) {
                //    return '/' + moduleName;
                //},
                base: 'src/directives',
                useStrict: true,
                amd: true,                
                module: 'mc.templates.gridFiltersTemplates'
            },
            src: ['src/directives/gridFilters/gridFilters.html'],
            dest: 'build/src/directives/gridFilters/gridFiltersTemplates.js'
        },
        gridResults: {
            options: {
                //rename: function (moduleName) {
                //    return '/' + moduleName;
                //},
                base: 'src/directives',
                useStrict: true,
                amd: true,               
                module: 'mc.templates.gridResultsTemplates'
            },
            src: ['src/directives/gridResults/gridResults.html'],
            dest: 'build/src/directives/gridResults/gridResultsTemplates.js'
        },

        classifiedReport: {
            options: {
                //rename: function (moduleName) {
                //    return '/' + moduleName;
                //},
                useStrict: true,
                base: 'src/modules/classified-report',
                amd: true,               
                module: 'mc.templates.classifiedReportTemplate'
            },
            src: ['src/modules/classified-report/views/postings.html'],
            dest: 'build/src/modules/classified-report/classifiedReportTemplates.js'
        }
    };
};