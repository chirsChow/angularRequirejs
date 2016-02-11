'use strict';

define(['angular'],
    function (angular) {
        var gridFiltersController = function ($scope, $stateParams, $location, $filter, $cookies, $timeout, groupingService, classifiedReportsService, controllerConstants, dateTimeUtils) {
            var self = this;

            $scope.contactId = $scope.$parent.contactId;
            $scope.model = {};

            $scope.$watch('$parent.activeTab', function (item) {
                $scope.reportType = item.reportType;
                self.setDefaultFilters();
            });

            self.init = function () {
                var date = new Date();
                var startDt = angular.element(document.querySelector('#startDate-' + $scope.dpIndex)).prop('value');
                var endDt = angular.element(document.querySelector('#endDate-' + $scope.dpIndex)).prop('value');

                $scope.dateRanges = controllerConstants.dateRanges;
                $scope.defaultProperty = controllerConstants.defaultProperty;
                $scope.defaultGroup = controllerConstants.defaultGroup;

                $scope.model = {
                    selectedProperty: {}
                };

              //  self.prepareCityStateDropdown();
                self.prepareGroupingDropdown();
                self.preparePropertyDropdown();
            };
            
            self.setDefaultFilters = function () {

                $scope.model.dateRange = {
                    value: 30
                };

                switch ($scope.reportType) {
                    case 'posting-summary':
                        $scope.model.dateRange.value = 90;
                        break;
                    case 'postings':
                        $scope.model.showVChkBox = true;
                        break;
                    case 'daily-activity':
                        $scope.model.dateRange.value = 90;
                        break;
                    default:
                        $scope.model.dateRange.value = 90;
                        break;
                }

                $scope.defaultFilters = {
                    group: $scope.defaultGroup,
                    property: $scope.defaultProperty,
                    propertyIds: [],
                    dateRange: {
                        startDate: dateTimeUtils.formatDate(dateTimeUtils.calculatePrvDate($scope.model.dateRange.value)),
                        endDate: dateTimeUtils.formatDate(new Date())
                    }
                };
                
                $scope.selectedFilters = angular.copy($scope.defaultFilters);               
            };
          
            /**
             * Prepare grouping dropdown
             */
            self.prepareGroupingDropdown = function () {              

                groupingService.getEntityGroupsById($scope.contactId)
                    .then(function (response) {
                        $scope.groups = response;

                    if ($scope.selectedGroupId && $scope.selectedGroupId !== '0') {
                        for (var grp = 0; grp < $scope.groups.length; grp++) {
                            var eachGrp = $scope.groups[grp];

                            if (eachGrp.id === $scope.selectedGroupId) {
                                $scope.model.selectedGroup = eachGrp;
                                break;
                            }
                        }
                    }

                    if (!$scope.groups || $scope.groups.length === 0) {
                        $scope.noGroupsMessage = 'The user is not assigned to any group.';
                    }

                  

                }, function (err) {
                    $scope.requestError = true;
                });

               
            };

            /**
            * Prepare property list
            */
            self.preparePropertyDropdown = function () {

                classifiedReportsService.getPropertiesByContactId($scope.contactId)
                    .then(function (response) {
                        $scope.properties = angular.copy(response);
                        $scope.stateProperties = angular.copy(response);
                        $scope.cityProperties = angular.copy(response);

                        $scope.propertiesAll = response;

                        if ($scope.propertyId && $scope.propertyId !== '0') {

                            var propId = $scope.propertyId[0] ? $scope.propertyId[0] : ($scope.model.selectedProperty.property_id ? $scope.model.selectedProperty.property_id : 0);

                            for (var prop = 0; prop < $scope.properties.length; prop++) {
                                var eachProp = $scope.properties[prop];

                                if (eachProp.property_id === propId) {
                                    $scope.model.selectedProperty.property_id = $scope.propertyId[0];
                                    $scope.model.selectedProperty.property_name = eachProp.property_name;
                                    // $scope.globProp.name=eachProp.property_name;
                                    $scope.propertyKey = eachProp.property_key;
                                    //    $scope.globProp.key=eachProp.property_key;
                                    break;
                                }
                            }                            
                        }                     

                       // $timeout(function () {
                            var propertyId = +$cookies.property_id;

                            if (propertyId) {                              
                                _.each($scope.properties, function (item) {
                                    if (item.property_id === propertyId) {
                                        $scope.model.selectedProperty = item;
                                    }
                                });
                            }
                       // }, 500);                        
                },function (err) {
                    $scope.requestError = true;
                });
            };

            /** Filtering verified posts for posting report */
            $scope.showVerifiedPosts = function () {
                $scope.selectedFilters.showVerified = $scope.model.showVerified;
            };

            /**
             * Generate report on group dropdown selection.
             */
            $scope.groupReport = function () {               
                if (!$scope.groups || $scope.groups.length === 0) {
                    $scope.noGroupsMessage = 'The user is not assigned to any group.';
                }

                if ($scope.model.selectedGroup) {
                    $scope.selectedFilters.group = $scope.model.selectedGroup;
                }
                else {
                    $scope.selectedFilters.group = null;
                }

                $scope.model.selectedProperty = $scope.defaultProperty;
                $scope.model.selectedState = $scope.defaultProperty;
                $scope.model.selectedCity = $scope.defaultProperty;

                self.setDefaultFilters();
            };
          
            $scope.stateReport = function () {
                $scope.selectedFilters.propertyIds = [];

                $scope.selectedGroup = $scope.defaultGroup;
                if ($scope.model.selectedState) {
                    $scope.properties = $filter('filterByRegion')($scope.properties, 'state_name', $scope.model.selectedState.state_name, '');//$scope.defaultProperty;;

                    _.each($scope.cityProperties, function (obj) {
                        if (obj.property_id) {
                            $scope.selectedFilters.propertyIds.push(obj.property_id);
                        }                        
                     });

                    $scope.cityProperties = angular.copy($scope.properties);
                }
            };

            $scope.cityReport = function () {
                $scope.selectedFilters.propertyIds = [];
                $scope.model.selectedGroup = $scope.defaultGroup;

                if ($scope.model.selectedCity) {
                    $scope.properties = $filter('filterByRegion')($scope.properties, 'city_name', $scope.model.selectedCity.city_name, '');//$scope.defaultProperty;;

                    _.each($scope.properties, function (obj) {
                        if (obj.property_id) {
                            $scope.selectedFilters.propertyIds.push(obj.property_id);
                        }
                    });
                }
            };


            /**
            * Generate report on property dropdown selection.
            */
            $scope.propertyReport = function () {
                $scope.model.selectedGroup = $scope.defaultGroup;
                $scope.model.selectedGroupId = 0;
                $scope.selectedFilters.propertyIds = [];

                angular.element(document.querySelector('#groupId')).val('0');
                if ($scope.dpIndex === 1) {
                    $scope.model.selectedState = $scope.defaultProperty;
                    $scope.model.selectedCity = $scope.defaultProperty;
                }

                if ($scope.model.selectedProperty) {
                    $scope.selectedFilters.property = $scope.model.selectedProperty;
                    if ($scope.model.selectedProperty.property_id) {
                        $scope.selectedFilters.propertyIds.push($scope.model.selectedProperty.property_id);
                        $cookies.property_id = $scope.model.selectedProperty.property_id;
                    }
                }
            };


            $scope.generateReport = function () {
                var startDt = '';
                var startDtStr = '';
                var endDt = '';
                var endDtStr = '';
                var date = new Date();

                if ($scope.model.dateRange.name === 'Custom' && !$scope.propertyChange) {
                    return;
                }

                if ($scope.model.dateRange.name === 'Last Month') {
                    startDtStr = dateTimeUtils.formatDate(new Date(date.getFullYear(), date.getMonth() - 1, 1));
                    $scope.startDateObj = new Date(Date.parse(startDtStr));
                    endDtStr = dateTimeUtils.formatDate(new Date(date.getFullYear(), date.getMonth(), 0));
                    $scope.endDateObj = new Date(Date.parse(endDtStr));

                } else if ($scope.model.dateRange.name === 'Month To Date') {
                    startDtStr = dateTimeUtils.formatDate(new Date(date.getFullYear(), date.getMonth(), 1));
                    $scope.startDateObj = new Date(Date.parse(startDtStr));
                    endDtStr = dateTimeUtils.formatDate(new Date());
                    $scope.endDateObj = new Date(Date.parse(endDtStr));
                } else {
                    startDtStr = dateTimeUtils.formatDate(dateTimeUtils.calculatePrvDate($scope.model.dateRange.value));
                    $scope.startDateObj = new Date(Date.parse(startDtStr));
                    endDtStr = dateTimeUtils.formatDate(new Date());
                    $scope.endDateObj = new Date(Date.parse(endDtStr));
                }

                $scope.selectedFilters.dateRange = {
                    startDate: startDtStr,
                    endDate: endDtStr
                };
            };

            $scope.refreshFilters = function () {

            };

            $scope.resetAll = function () {             
                $scope.model.selectedGroup = $scope.defaultGroup;
                $scope.model.selectedProperty = $scope.defaultProperty;
                $scope.model.selectedState = $scope.defaultProperty;
                $scope.model.selectedCity = $scope.defaultProperty;
                $scope.properties = angular.copy($scope.propertiesAll);

                $cookies.property_id = 0;
                                
                self.setDefaultFilters();
            };

            /**
             * Custom date report - on From Date & To Date.
             */
            $scope.customDateReport = function () {
                //custom date range.
                var startDt = angular.element(document.querySelector('#startDate')).prop('value');
                var endDt = angular.element(document.querySelector('#endDate')).prop('value');
                var oneDay = 24 * 60 * 60 * 1000;

                $scope.msgStatus = false;
                $scope.validateMsg = '';


                if (startDt === '') {
                    $scope.msgStatus = true;
                    $scope.validateMsg = 'Please select From date.';
                    return;
                }
                if (endDt === '') {
                    $scope.msgStatus = true;
                    $scope.validateMsg = 'Please select To date.';
                    return;
                }
                if (new Date(startDt) > new Date(endDt)) {
                    $scope.msgStatus = true;
                    $scope.validateMsg = 'From date must come before To date';
                    //angular.element(document.querySelector('#go')).css('visibility', 'hidden');
                    return;
                }
                var diffDays = Math.round(Math.abs((new Date(startDt).getTime() - new Date(endDt).getTime()) / (oneDay)));

                if (diffDays > 365) {
                    $scope.msgStatus = true;
                    $scope.validateMsg = 'The range between From and To dates should not exceed a Year';
                    return;
                }

                if (!$scope.msgStatus) {
                    $scope.selectedFilters.dateRange = {
                        startDate: startDt,
                        endDate: endDt
                    };
                    if ($scope.model.selectedProperty && $scope.model.selectedProperty.property_id && $scope.model.selectedProperty.property_id !== 0) {
                        $scope.selectedFilters.propertyIds = [$scope.model.selectedProperty.property_id];
                    } else if ($scope.propertyId) {
                        $scope.selectedFilters.propertyIds = $scope.propertyId;
                    }

                    // State Selected
                    if ($scope.model.selectedState && $scope.model.selectedState.property_id !== 0) {
                        $scope.selectedFilters.propertyIds = [$scope.model.selectedState.property_id];
                    }

                    // City Selected
                    if ($scope.model.selectedCity && $scope.model.selectedCity.property_id !== 0) {
                        $scope.selectedFilters.propertyIds = [$scope.model.selectedCity.property_id];
                    }

                    // Updated piece of code for group integration
                    if ($scope.model.selectedGroup && $scope.model.selectedGroup.id !== 0) {
                        $scope.selectedFilters.group.id = $scope.model.selectedGroup.id;
                    }                    
                }
            };

            self.init();
        };

        gridFiltersController.$inject = ['$scope', '$stateParams', '$location', '$filter', '$cookies', '$timeout',
            'mc.services.groupingService',
            'mc.services.classifiedReportsService',
            'mc.constants.controllerConstants',
            'mc.utilites.dateTimeUtils'
        ];

        return gridFiltersController;
    });