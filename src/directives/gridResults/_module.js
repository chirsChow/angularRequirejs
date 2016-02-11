'use strict';

define(['angular',
    './gridResultsDirective',
    './gridResultsController',
    './gridResultsTemplates'
],
    function (angular, gridResultsDirective, gridResultsController) {
        return angular.module('mc.widgets.gridResults', ['mc.templates.gridResultsTemplates'])
                    .controller('gridResultsController', gridResultsController)
                    .directive('gridResults', gridResultsDirective);
    });