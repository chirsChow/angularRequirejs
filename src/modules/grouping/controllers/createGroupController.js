/**
 * Created by MInuganti on 12/9/2015.
 */

'use strict';

define(['angular'],
    function (angular, jQuery) {
        var CreateGroupController = function ($scope, groupingService, $window, $rootScope, busyIndicator) {
            /**----------------- variable declarations----------------------------*/
            $scope.allProperties = [];
            $scope.states = [];
            $scope.selectState = '';
            $scope.props = [];
            $scope.selectedPropertiesList = [];
            $scope.leftSelectProperties = [];
            $scope.rightSelectProperties = [];
            $scope.groupName = '';
            $scope.errorMessage = '';
            $scope.userId = '';
            /**-------------------- variable declarations----------------------------*/

            /**--------------init method to display all properties without filter----------*/
            $scope.init = function () {
                $scope.userId = groupingService.getUserId();
                loadAsPopup();
                busyIndicator.add('main-progress');
                $scope.allProperties = groupingService.getPropertyDetails();
                $scope.props = $scope.allProperties;
                getStates();
                busyIndicator.remove('main-progress');
                //getProperties();
            };
            var loadAsPopup = function () {
                jQuery().colorbox({
                    href: '#createGroup',
                    height: '850px',
                    inline: true,
                    oncomplete: function () {
                        jQuery(this).colorbox().resize();
                    }
                });
            };
            /**---------------function to fetch property details for a given contact-------------*/
            var getProperties = function () {
                var propertiesdata = groupingService.loadProperties($scope.userId);
                propertiesdata.success(function (response) {
                    $scope.allProperties = response;
                    $scope.props = response;
                    getStates();
                    busyIndicator.remove('main-progress');
                });
                propertiesdata.error(function (response) {
                    busyIndicator.remove('main-progress');
                    $scope.errorMessage = 'An Internal error has occurred onload';
                });
            };

            /**-----------------------function to fetch states filter dropdown---------------------*/
            var getStates = function () {
                angular.forEach($scope.allProperties, function (prop) {
                    var exists = false;
                    if (prop.state_code !== '') {
                        angular.forEach($scope.states, function (state) {
                            if (state === prop.state_code) {
                                exists = true;
                            }
                        });
                        if (!exists) {
                            $scope.states.push(prop.state_code);
                        }
                    }
                });
            };


            /**----------------------reset method to reset UI elements------------------------------*/
            $scope.reset = function () {
                $scope.props = $scope.allProperties;
                $scope.selectState = '';
                $scope.searchKeyword = '';
                $scope.selectedPropertiesList = [];
                $scope.leftSelectProperties = [];
                $scope.rightSelectProperties = [];
                $scope.groupName = '';
                $scope.errorMessage = '';
                $scope.groupNameInvalid = false;
                $scope.userId = groupingService.getUserId();
            };
            /**----------------------close create group popup---------------------------------------*/

            jQuery(this).bind('cbox_cleanup', function () {
                $rootScope.createGroupShow = false;
                $window.location.href = '/groups/' + $scope.userId;
            });

            /**-------------------function to add selected properties to 'Selected' tab-------------------*/
            $scope.addSelected = function () {
                $scope.groupNameInvalid = false;
                if ($scope.leftSelectProperties.length > 0) {
                    angular.forEach($scope.leftSelectProperties, function (leftProp) {
                        $scope.props.forEach(function (prop, index) {
                            if (prop.property_id === leftProp) {
                                $scope.selectedPropertiesList.push(prop);
                                $scope.props.splice(index, 1);
                            }
                        });
                    });
                    $scope.leftSelectProperties = [];
                    $scope.errorMessage = '';
                }
                else {
                    if ($scope.props.length > 0) {
                        $scope.errorMessage = '*Please select at least one property to add';
                    }
                }
            };

            /**------------------function to add all properties to 'Selected' tab-----------------------------*/
            $scope.addAll = function () {
                $scope.groupNameInvalid = false;
                if ($scope.props.length > 0) {
                    $scope.errorMessage = '';
                    angular.forEach($scope.props, function (prop) {
                        $scope.selectedPropertiesList.push(prop);
                    });
                    $scope.props = [];
                }
            };

            /**------------------function remove all properties from 'Selected' tab-------------------------*/
            $scope.removeAll = function () {
                $scope.groupNameInvalid = false;
                if ($scope.selectedPropertiesList.length > 0) {
                    $scope.errorMessage = '';
                    angular.forEach($scope.selectedPropertiesList, function (prop) {
                        $scope.props.push(prop);
                    });
                    $scope.selectedPropertiesList = [];
                }
            };

            /**------------------function to remove selected properties from 'Selected' tab----------------------*/
            $scope.removeSelected = function () {
                $scope.groupNameInvalid = false;
                if ($scope.rightSelectProperties.length > 0) {
                    angular.forEach($scope.rightSelectProperties, function (rightProp) {
                        $scope.selectedPropertiesList.forEach(function (prop, index) {
                            if (prop.property_id === rightProp) {
                                $scope.props.push(prop);
                                $scope.selectedPropertiesList.splice(index, 1);
                            }
                        });
                    });
                    $scope.rightSelectProperties = [];
                    $scope.errorMessage = '';
                }
                else {
                    if ($scope.selectedPropertiesList.length > 0) {
                        $scope.errorMessage = '*Please select at least one property to remove';
                    }
                }
            };

            /**------------------------function to filter properties by state--------------------------------*/

            $scope.filterByState = function (st) {
                $scope.groupNameInvalid = false;
                $scope.errorMessage = '';
                $scope.searchKeyword = '';
                $scope.props = getLeftProps();
                if (st !== '') {
                    var filteredProps = [];
                    angular.forEach($scope.props, function (item) {
                        if (item.state_code === st) {
                            filteredProps.push(item);
                        }
                    });
                    $scope.props = filteredProps;
                }
            };

            var getLeftProps = function () {
                var leftProps = [];
                angular.forEach($scope.allProperties, function (item) {
                    var selected = false;
                    angular.forEach($scope.selectedPropertiesList, function (rightProp) {
                        if (item.property_id === rightProp.property_id) {
                            selected = true;
                        }
                    });
                    if (!selected) {
                        leftProps.push(item);
                    }
                });
                return leftProps;
            };

            /**------------------function to filter properties by filter keyword--------*/
            $scope.filterByKeyword = function (keyword) {
                $scope.groupNameInvalid = false;
                $scope.errorMessage = '';
                $scope.selectState = '';
                $scope.props = getLeftProps();
                if (keyword !== '') {
                    var filteredProps = [];
                    var key = keyword.toLowerCase();
                    angular.forEach($scope.props, function (item) {
                        if (item.property_name.toLowerCase().indexOf(key) !== -1 ||
                             item.state_code.toLowerCase().indexOf(key) !== -1 ||
                             item.city_name.toLowerCase().indexOf(key) !== -1) {
                            filteredProps.push(item);
                        }
                    });
                    $scope.props = filteredProps;
                }
            };

            /**------------------function to create group-----------------------------------*/
            $scope.createGroup = function () {
                $scope.errorMessage = '';
                if ($scope.selectedPropertiesList.length < 2) {
                    $scope.errorMessage = '*Please select at least two properties to create group';
                }
                else if ($scope.groupName === '') {
                    $scope.groupNameInvalid = true;
                }
                else {
                    busyIndicator.add('main-progress');
                    $scope.errorMessage = '';
                    $scope.groupNameInvalid = false;
                    var group = savegroup();
                    group.success(function (response) {
                        busyIndicator.remove('main-progress');
                        $window.location.href = '/groups/' + $scope.userId;
                    });
                    group.error(function (response) {
                        busyIndicator.remove('main-progress');
                        $scope.errorMessage = 'An Internal error has occurred during update';
                    });
                }
            };

            /**------------------function to create and assign group-----------------------------------*/
            $scope.createAndAssignGroup = function () {
                $scope.errorMessage = '';
                if ($scope.selectedPropertiesList.length < 2) {
                    $scope.errorMessage = '*Please select at least two properties to create group';
                }
                else if ($scope.groupName === '') {
                    $scope.groupNameInvalid = true;
                }
                else {
                    busyIndicator.add('main-progress');
                    $scope.errorMessage = '';
                    $scope.groupNameInvalid = false;
                    var group = savegroup();
                    group.success(function (response) {
                        groupingService.setGroupDetails(response);
                        busyIndicator.remove('main-progress');
                        $rootScope.assignGroupShow = true;
                    });
                    group.error(function (response) {
                        busyIndicator.remove('main-progress');
                        $scope.errorMessage = 'An Internal error has occurred during update';
                    });

                }

            };

            var savegroup = function () {
                var groupParams = {};
                var entityGroupType = {};
                entityGroupType.id = '1';
                var selectedProps = [];
                angular.forEach($scope.selectedPropertiesList, function (prop) {
                    selectedProps.push(prop.property_id);
                });
                groupParams.entityIds = selectedProps;
                groupParams.entityGroupName = $scope.groupName;
                groupParams.entityOwnerId = $scope.userId;
                groupParams.entityGroupType = entityGroupType;
                return groupingService.saveGroup(groupParams);
            };


        };

        CreateGroupController.$inject = ['$scope', 'groupingService', '$window', '$rootScope', 'busyIndicator'];

        return CreateGroupController;
    });


