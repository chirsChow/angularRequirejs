'use strict';

requirejs.config({
    baseUrl: '/angular@@/build',
    //urlArgs: 'bust=' + new Date().getTime(),
    paths: {
        'angular': 'libs/angular/angular.min',
        'angular-route': 'libs/angular/angular-route.min',
        'angular-animate': 'libs/angular/angular-animate.min',
        'angular-cookies': 'libs/angular/angular-cookies.min',
        'ui-router': 'libs/ui-router/angular-ui-router.min',
        'ui-grid': 'libs/ui-grid/ui-grid-unstable',
        'ui-bootstrap': 'libs/angular-bootstrap/ui-bootstrap.min',
        'ui-bootstrap-tpl': 'libs/angular-bootstrap/ui-bootstrap-tpls.min',
        'lodash': 'libs/lodash/lodash.min',
        'pdfmake': 'libs/pdfmake/pdfmake.min',
        'angular-tooltips': 'libs/angular-tooltips/angular-tooltips.min',
        'q': 'libs/q'
    },
    shim: {
        'angular': {
            exports: 'angular'
        },
        'angular-animate': {
            deps: ['angular'],
            exports: 'angular-animate'
        },
        'angular-cookies': {
            deps: ['angular'],
            exports: 'angular-cookies'
        },
        'ui-router': {
            deps: ['angular'],
            exports: 'ui-router'
        },
        'angular-route': {
            deps: ['angular'],
            exports: 'angular-route'
        },
        'angular-tooltips': {
            deps: ['angular'],
            exports: 'angular-tooltips'
        },
        'q': {
            exports: 'q'
        },
        'ui-grid': {
            deps: ['angular'],
            exports: 'ui-grid'
        },
        'ui-bootstrap': {
            deps: ['angular'],
            exports: 'ui-bootstrap'
        },
        'ui-bootstrap-tpl':{
            deps: ['angular'],
            exports: 'ui-bootstrap-tpl'
        },
        'lodash': {
            deps: ['angular'],
            exports: 'lodash'
        },
        'pdfmake': {
            exports: 'pdfmake'
        }
    },
    deps: []
});
