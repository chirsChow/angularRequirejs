'use strict';

define(['angular'],
    function (angular) {
        var gridResults = function () {
            return {
                restrict: 'AE',
                scope:{
                    gridOptions: '='
                },
                templateUrl: 'gridResults/gridResults.html',
                controller: 'gridResultsController',
                link: function (scope, elem, attrs, ctrl, ngModel) {                

                    if (scope.$parent.gridOptions) {
                        angular.extend(scope.gridOptions, scope.$parent.gridOptions);
                    }

                    scope.$watchCollection('gridOptions', function (n, o) {
                        if (n === o) {
                            return false;
                        }

                        scope.gridOptions.minRowsToShow = 31; //resetting everytime for directive to get triggered.

                        if (scope.gridOptions.data && scope.gridOptions.data.length) {
                            if (scope.gridOptions.data.length < scope.gridOptions.minRowsToShow) {
                                scope.gridOptions.minRowsToShow = scope.gridOptions.data.length + 1;
                            }
                        } else {
                            scope.noDataMsg = 'There are no metrics for this report.';
                        }
                    });

                    if (document.querySelector('.ui-grid-menu-button')) {
                        document.querySelector('.ui-grid-menu-button').title = 'Click to export data to a CSV or PDF file.';
                    }
                }
            };
        };

        return gridResults;
    });