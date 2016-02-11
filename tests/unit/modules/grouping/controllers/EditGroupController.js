/**
 * Created by MInuganti on 12/9/2015.
 */
mainApp.controller("EditGroupController", ['$scope', 'groupingService', '$window', '$rootScope','busyIndicator',
    function ($scope, groupingService, $window, $rootScope,busyIndicator) {
        /**------------------ variable declarations----------------------------*/
        $scope.allProperties = [];
        $scope.selectState = "";
        $scope.props = [];
        $scope.selectedPropertiesList = [];
        $scope.leftSelectProperties = [];
        $scope.rightSelectProperties = [];
        $scope.groupName = '';
        $scope.errorMessage = '';
        $scope.userId = '';
        $scope.states = [];
        $scope.groupDetails = new Object();
        /**-------------------- variable declarations-------------------------------*/

        /**------------------init method to display all properties without filter------------------------------*/
        $scope.init = function () {
            loadAsPopup();
            busyIndicator.add("main-progress");
            $scope.groupDetails = groupingService.getGroupDetails();
            $scope.groupName = $scope.groupDetails.entityGroupName;
            $scope.groupId = $scope.groupDetails.id;
            $scope.userId = $scope.groupDetails.entityOwnerId;
            getProperties();
            busyIndicator.remove("main-progress");
        };

        var loadAsPopup = function () {
            jQuery().colorbox({
                href: '#editGroup',
                inline: true,
                oncomplete: function () {
                    jQuery(this).colorbox().resize();
                }
            });
        };


        /**-----------------------function to fetch property details for a given contact-----------------------*/
        var getProperties = function () {
            $scope.allProperties = groupingService.getPropertyDetails();
            getStates();
            angular.forEach($scope.allProperties, function (prop) {
                var selected = false;
                angular.forEach($scope.groupDetails.entityIds, function (selectedPropId) {
                    if (selectedPropId == prop.property_id) {
                        $scope.selectedPropertiesList.push(prop);
                        selected = true;
                    }
                });
                if (!selected) {
                    $scope.props.push(prop);
                }
            });
        };

        /**-----------------------function to fetch states filter dropdown---------------------*/
        var getStates = function () {
            angular.forEach($scope.allProperties, function (prop) {
                var exists = false;
                if (prop.state_code != "") {
                    angular.forEach($scope.states, function (state) {
                        if (state == prop.state_code) {
                            exists = true;
                        }
                    });
                    if (!exists) {
                        $scope.states.push(prop.state_code);
                    }
                }
            });
        };


        /**------------------------------function to reset UI elements-----------------------------------*/
        $scope.reset = function () {
            $scope.props = $scope.allProperties;
            $scope.selectState = "";
            $scope.searchKeyword ='';
            $scope.selectedPropertiesList = [];
            $scope.leftSelectProperties = [];
            $scope.rightSelectProperties = [];
            $scope.groupName = '';
            $scope.errorMessage = '';
            $scope.groupNameInvalid = false;
            $scope.userId = $scope.groupDetails.entityOwnerId;
        };

        /**------------------------------function to close popup-----------------------------------*/

        jQuery(document).bind('cbox_cleanup',function(){
            $rootScope.editGroupShow = false;
            $window.location.href = "/groups/"+$scope.userId;
        });

        /**-------------------function to add selected properties to 'Selected' tab-------------------*/
        $scope.addSelected = function () {
            if ($scope.leftSelectProperties.length > 0) {
                angular.forEach($scope.leftSelectProperties, function (leftProp) {
                    $scope.props.forEach(function (prop, index) {
                        if (prop.property_id == leftProp) {
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
                    $scope.errorMessage = "*Please select at least one property to add";
                }
            }
        };

        /**------------------function to add all properties to 'Selected' tab-----------------------------*/
        $scope.addAll = function () {
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
            if ($scope.rightSelectProperties.length > 0) {
                angular.forEach($scope.rightSelectProperties, function (rightProp) {
                    $scope.selectedPropertiesList.forEach(function (prop, index) {
                        if (prop.property_id == rightProp) {
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
                    $scope.errorMessage = "*Please select at least one property to remove";
                }
            }
        };


        /**------------------------function to filter properties by state--------------------------------*/

        $scope.filterByState = function (st) {
            $scope.errorMessage="";
            $scope.searchKeyword = "";
            $scope.props = getLeftProps();
            if (st != "") {
                var filteredProps = [];
                angular.forEach($scope.props, function (item) {
                    if (item.state_code == st) {
                        filteredProps.push(item);
                    }
                });
                $scope.props = filteredProps;
            }
        };

        var getLeftProps = function(){
            var leftProps = [];
            angular.forEach($scope.allProperties, function (item) {
                var selected = false;
                angular.forEach($scope.selectedPropertiesList, function (rightProp) {
                    if(item.property_id == rightProp.property_id){
                        selected = true;
                    }
                });
                if (!selected) {
                    leftProps.push(item);
                }
            });
            return leftProps;
        }
        /**------------------function to filter properties by filter keyword--------*/
        $scope.filterByKeyword = function (keyword) {
            $scope.errorMessage="";
            $scope.selectState = "";
            $scope.props = getLeftProps();
            if (keyword != "") {
                var filteredProps = [];
                var key = keyword.toLowerCase();
                angular.forEach($scope.props, function (item) {
                    if (item.property_name.toLowerCase().indexOf(key) != -1
                        || item.state_code.toLowerCase().indexOf(key) != -1
                        || item.city_name.toLowerCase().indexOf(key) != -1) {
                        filteredProps.push(item);
                    }
                });
                $scope.props = filteredProps;
            }
        };


        /**------------------function to update edited group details-----------------------------------*/

        $scope.updateGroup = function () {
            if ($scope.selectedPropertiesList.length < 2) {
                $scope.errorMessage = "*Please select at least two properties to update group";
            }

            else if ($scope.groupName == "") {
                $scope.groupNameInvalid = true;
            }
            else {
                busyIndicator.add("main-progress");
                $scope.errorMessage = "";
                $scope.groupNameInvalid = false;
                var group = updateGroup();
                group.success(function (response) {
                    busyIndicator.remove("main-progress");
                    $rootScope.editGroupShow = false;
                    $window.location.href = "/groups/" + $scope.userId;
                });
                group.error(function (response) {
                    busyIndicator.remove("main-progress");
                    $scope.errorMessage = "An Internal error has occurred during update";
                });
            }
        };

        /**------------------function to update and assign user for edited group details--------------------*/
        $scope.updateAndAssignGroup = function () {
            if ($scope.selectedPropertiesList.length < 2) {
                $scope.errorMessage = "*Please select at least two properties to update group";
            }
            else if ($scope.groupName == "") {
                $scope.groupNameInvalid = true;
            }
            else {
                busyIndicator.add("main-progress");
                $scope.errorMessage = "";
                $scope.groupNameInvalid = false;
                var group = updateGroup();
                group.success(function (response) {
                    busyIndicator.remove("main-progress");
                    $scope.groupDetails.entityGroupName = $scope.groupName;
                    $scope.groupDetails.entityIds = $scope.selectedProps;
                    groupingService.setGroupDetails($scope.groupDetails);
                    $rootScope.assignGroupShow = true;
                });
                group.error(function (response) {
                    busyIndicator.remove("main-progress");
                    $scope.errorMessage = "An Internal error has occurred during update"
                });
            }

        };

        var updateGroup = function () {
            var groupParams = new Object();
            var entityGroupType = new Object();
            entityGroupType.id = '1';
            $scope.selectedProps = [];
            angular.forEach($scope.selectedPropertiesList, function (prop) {
                $scope.selectedProps.push(prop.property_id);
            });
            groupParams.entityIds = $scope.selectedProps;
            groupParams.entityGroupName = $scope.groupName;
            groupParams.entityOwnerId = $scope.userId;
            groupParams.entityGroupType = entityGroupType;
            var assignedUserIds = [];
            if($scope.groupDetails.hasOwnProperty('assignedUsers')){
                angular.forEach($scope.groupDetails.assignedUsers, function (item) {
                    assignedUserIds.push(item.id);
                });
            }
            groupParams.assignedUserIds = assignedUserIds;
            return groupingService.updateEntityGroup($scope.groupId, groupParams);
        };
    }]);


