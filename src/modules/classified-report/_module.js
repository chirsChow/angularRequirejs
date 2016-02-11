/**
 * Created module application for classified reports.
 * @type {module}
 */

'use strict';

define(['angular',
        './controllers/classifiedReportsController',
        './services/classifiedReportsService',
        './services/mcClassifiedReportChartUtil',
        './services/dataTransformationService',
        './classifiedReportTemplates'
],
    function (angular, classifiedReportsController, classifiedReportsService, mcClassifiedReportChartUtil,dataTransformationService) {
        return angular.module('mc.modules.classifiedReports',
            ['ngRoute', 'ngAnimate', 'ui.grid', 'ui.grid.selection',
                'ui.grid.exporter', 'ui.grid.pagination', 'ui.bootstrap'])
            .controller('mc.controllers.classifiedReportsController', classifiedReportsController)
            .service('mc.services.classifiedReportsService', classifiedReportsService)
            .service('mc.services.mcClassifiedReportChartUtil', mcClassifiedReportChartUtil)
            .service('mc.services.dataTransformationService', dataTransformationService)
            .filter('unique', function () {
                return function (items, filterOn) {
                    if (filterOn === false) {
                        return items;
                    }

                    if ((filterOn || angular.isUndefined(filterOn)) && angular.isArray(items)) {
                        var hashCheck = {}, newItems = [];

                        var extractValueToCompare = function (item) {
                            if (angular.isObject(item) && angular.isString(filterOn)) {
                                return item[filterOn];
                            } else {
                                return item;
                            }
                        };

                        angular.forEach(items, function (item) {
                            var valueToCheck, isDuplicate = false;

                            for (var i = 0; i < newItems.length; i++) {
                                if (angular.equals(extractValueToCompare(newItems[i]), extractValueToCompare(item))) {
                                    isDuplicate = true;
                                    break;
                                }
                            }
                            if (!isDuplicate) {
                                newItems.push(item);
                            }

                        });
                        items = newItems;
                    }
                    return items;
                };
            }).filter('filterByRegion', function () {
                return function (data, filterName, filterVal, fieldName) {

                    var matches = [];

                    //loop through data items and visible fields searching for match
                    for (var i = 0; i < data.length; i++) {

                        var dataItem = data[i];
                        // var fieldName = 'property_id';

                        if (dataItem[filterName] === filterVal) {
                            if (fieldName && fieldName !== '') {
                                matches.push(dataItem[fieldName]);
                            }
                            else { matches.push(dataItem); }
                        }
                    }
                    return matches;
                };
            });
    });

