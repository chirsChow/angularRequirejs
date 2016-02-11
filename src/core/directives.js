'use strict';

define(['angular',
    '../directives/formatPhoneDirective',
    '../directives/modalShowDirective',
    '../directives/myUiGridResizeDirective',
    '../directives/tabPanelsDirective',
    '../directives/gridFilters/_module',
    '../directives/gridResults/_module',
],
    function (angular, formatPhone, modalShow, myUiGridResize, tabPanels, gridFilters, gridResults) {
        return angular.module('mc.core.widgets', ['mc.widgets.gridFilters', 'mc.widgets.gridResults'])
            .directive('formatPhone', formatPhone)           
            .directive('modalShow', modalShow)
            .directive('tabPanels', tabPanels)
            .directive('myUiGridResize', myUiGridResize);
});
