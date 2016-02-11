'use strict';

define(['angular',
    './gridFiltersDirective',
    './gridFiltersController',
    './gridFiltersTemplates'
],
    function (angular, gridFiltersDirective, gridFiltersController) {
        return angular.module('mc.widgets.gridFilters', ['mc.templates.gridFiltersTemplates'])
                    .controller('gridFiltersController',gridFiltersController)
                    .directive('gridFilters', gridFiltersDirective);
    });