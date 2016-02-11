/**
 * Created by Raju Bomma on 12/3/2015.
 */

mainApp.controller('groupingController', ['$scope', '$location', '$routeParams', 'groupingService', 'busyIndicator', '$rootScope', '$window', function ($scope, $location, $routeParams, groupingService, busyIndicator, $rootScope, $window) {
    $rootScope.editGroupShow = false;
    $rootScope.assignGroupShow = false;
    $scope.tableLoad = false;
    $scope.sortBy = "group.entityGroupName";
    $scope.descending = true;

    function init() {
        console.log($routeParams.userId);
        $scope.assignPrivilege = jQuery('#assignPrivilege').val();
        if ($routeParams.userId > 0) {
            //alert($routeParams.userId);
            //console.log($routeParams.userId);
            groupingService.setUserId($routeParams.userId);
            retrieveEntityGroupsById($routeParams.userId);
        }
    }

    init();

    /**
     * Retrieve Entity Groups Assigned to a User.
     * @param syndId
     */
    function retrieveEntityGroupsById(userId) {
        busyIndicator.add("main-progress");
        var entityGroups = groupingService.getEntityGroupsById($routeParams.userId);

        entityGroups.success(function (response) {
            // Assign the syndication partner object to scope.
            $scope.groupsArray = [];
            groupingService.loadProperties($routeParams.userId)
                .success(function (propertiesdataresponse) {
                    $scope.groups = response;
                    groupingService.setPropertyDetails(propertiesdataresponse);
                    _.each($scope.groups, function (group) {
                        var propHtml = "<ul>";
                        var userHtml = "<ul>";
                        var users = _.sortBy(group.assignedUsers, 'displayName');
                        _.each(users, function (assignedUser) {
                            userHtml = userHtml + "<li>" + assignedUser.displayName + "</li>";
                        });

                        group.assignedUserTooltip = userHtml + "</ul>";

                        _.each(group.entityIds, function (entityId) {
                            _.sortBy(propertiesdataresponse, 'property_name');

                            _.each(propertiesdataresponse, function (property) {
                                if (entityId == property.property_id) {
                                    propHtml = propHtml + "<li>" + property.property_name + "</li>";
                                }
                            });
                        });
                        group.propertiesTooltip = propHtml + "</ul>";
                        $scope.groupsArray.push(group);
                    });
                });

            busyIndicator.remove("main-progress");
            $scope.tableLoad = true;
        });

        entityGroups.error(function () {
            $scope.tableLoad = true;
            busyIndicator.remove("main-progress");
            $scope.requestError = true;
        });

    }

    $scope.sortTable = function (column) {
        if ($scope.sortBy == column) {
            $scope.descending = !$scope.descending;
        }
        else {
            $scope.sortBy = column;
            $scope.descending = true;
        }
    }

    $scope.isAssignEligible = function (index) {
        $rootScope.assignUserPrivilege = $scope.assignPrivilege == "false" ? false : true;

        if ($scope.isEditEligible(index)) {
            return $rootScope.assignUserPrivilege;
        }
    };
    $scope.isEditEligible = function (index) {
        return ($scope.groups[index].entityOwnerId == $routeParams.userId);
    };

    $scope.createGroup = function () {
        groupingService.setUserId($routeParams.userId);
        $rootScope.createGroupShow = true;
    };

    $scope.assignGroup = function (group) {
        groupingService.setGroupDetails(group);
        $rootScope.assignGroupShow = true;
    };

    $scope.editGroup = function (group) {
        groupingService.setGroupDetails(group);
        $rootScope.editGroupShow = true;
    };

    $scope.deleteGroup = function (groupId) {
        var groups = groupingService.deleteGroup(groupId);
        groups.success(function (response) {
            $window.location.href = "/groups/" + $routeParams.userId;
        });
    };

    $scope.copyGroup = function (group) {

    };

}]);