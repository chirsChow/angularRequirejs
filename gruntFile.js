'use strict';

module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        distDir: 'build',

        src: {
            js: ['angular/src/**/*.js'],
            templates: ['angular/src/templates/*.html','angular/src/views/*.html']
        },

        meta: {
            banner: '/**\n' +
                       ' * <%= pkg.name %> - <%= grunt.template.today("UTC:yyyy/mm/dd HH:MM:ss Z") %>\n' +
                      '*/'
        },        
    });



    // Load the project's grunt tasks from a directory
    require('grunt-config-dir')(grunt, {
        configDir: require('path').resolve('tasks')
    });

    // Default task.
    grunt.registerTask('default', ['watch']);

    // Watch task with livereload
    grunt.registerTask('watch', ['watch']);

    grunt.registerTask('dev', [
        'clean:build',        
        'jshint',        
        'less',       
        'copy',
        'replace:dev',
        'html2js',
        'injector'
    ]);

    grunt.registerTask('release', [
        'clean:dist',            
        'jshint',        
        'less',       
        'copy',        
        'html2js',
        'concat',
        'injector',
        'replace:dist',
        'requirejs'//,
        //'karma:integration'
    ]);

    // Watch task with livereload
    grunt.registerTask('test', ['karma:unit']);


    grunt.loadNpmTasks('grunt-contrib-watch');
};
