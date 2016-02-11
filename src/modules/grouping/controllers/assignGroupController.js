/**
 * Created by MInuganti on 12/9/2015.
 */
'use strict';

define(['angular'],
    function (angular, jQuery) {
        var AssignGroupController = function ($scope, groupingService, $window, $rootScope, busyIndicator, $document) {

            /**------------------------------------- variable declarations---------------------*/
            $scope.allContacts = [];
            $scope.contacts = [];
            $scope.selectedContactsList = [];
            $scope.leftSelectContacts = [];
            $scope.rightSelectContacts = [];
            $scope.groupName = '';
            $scope.groupId = '';
            $scope.errorMessage = '';
            $scope.entityOwnerId = '';
            $scope.selectRole = '';
            $scope.userRoles = [];
            $scope.companyId = '';
            $scope.groupDetails = {};
            $scope.assignedUsers = [];


            /**-------------------------------------- variable declarations----------------------*/

            /**------------------init method to display all users and assigned users without filter---------*/
            $scope.init = function () {
                $scope.companyId = jQuery('#companyId').val();
                $scope.userId = groupingService.getUserId();
                loadAsPopup();
                busyIndicator.add('main-progress');
                $scope.groupDetails = groupingService.getGroupDetails();
                $scope.groupId = $scope.groupDetails.id;
                $scope.groupName = $scope.groupDetails.entityGroupName;
                $scope.entityOwnerId = $scope.groupDetails.entityOwnerId;
                if ($scope.groupDetails.hasOwnProperty('assignedUsers')) {
                    $scope.assignedUsers = $scope.groupDetails.assignedUsers;
                }
                getUsers();
                $scope.liClass = new Array($scope.allContacts.length);
                $scope.lastSelectedOption = -1;
            };

            /*------------------method to load assignGroup html as popup-----------------------------------*/
            var loadAsPopup = function () {
                jQuery().colorbox({
                    href: '#assignGroup',
                    inline: true,
                    width: '1050px',
                    height: '670px',
                    onComplete: function () {
                        jQuery(this).colorbox().resize();
                    }
                });
            };

            /*---------------------------method to fetch all users----------------------------------------*/
            var getUsers = function () {
                var userResponse = groupingService.loadUsers($scope.companyId);
                userResponse.success(function (data) {
                    $scope.allContacts = data;
                    disableUsers();
                    $scope.contacts = angular.copy($scope.allContacts);
                    if ($scope.assignedUsers.length > 0) {
                        angular.forEach($scope.assignedUsers, function (assignedUser) {
                            $scope.contacts.forEach(function (contact, index) {
                                if (contact.contact_id === assignedUser.id) {
                                    $scope.selectedContactsList.push(contact);
                                    $scope.contacts.splice(index, 1);
                                }
                            });
                        });
                    }
                    getContactRoles();
                    busyIndicator.remove('main-progress');
                });
                userResponse.error(function (data) {
                    busyIndicator.remove('main-progress');
                    $scope.errorMessage = 'An Internal error has occurred onload';
                });

            };
            /*---------------------------disable un assignable users----------------------------------------*/
            var disableUsers = function () {
                angular.forEach($scope.allContacts, function (contact) {
                    var disabled = true;
                    var propsCount = 0;
                    angular.forEach(contact.assignedproperties, function (propertyId) {
                        angular.forEach($scope.groupDetails.entityIds, function (entityId) {
                            if (entityId === propertyId) {
                                disabled = false;
                                propsCount += 1;
                            }
                        });
                        contact.disabled = disabled;
                        contact.totalproperties = propsCount;
                    });
                });
            };

            /*-----------------------------method to user roles----------------------------------------*/
            var getContactRoles = function () {
                angular.forEach($scope.allContacts, function (contact) {
                    var exists = false;
                    angular.forEach($scope.userRoles, function (role) {
                        if (role === contact.contact_role_name) {
                            exists = true;
                        }
                    });
                    if (!exists) {
                        $scope.userRoles.push(contact.contact_role_name);
                    }

                });
            };

            $scope.reset = function () {
                $scope.contacts = $scope.allContacts;
                $scope.leftSelectContacts = [];
                $scope.rightSelectContacts = [];
                $scope.selectRole = '';
                $scope.searchKeyword = '';
                $scope.errorMessage = '';
            };

            /**------------------function to close popup-----------------------------------------------------------*/
            jQuery(this).bind('cbox_cleanup', function () {
                $rootScope.assignGroupShow = false;
                $window.location.href = '/groups/' + $scope.userId;
            });


            /**-------------------function to add Selected contacts to Model object on click of elements in 'Selected' tab-------------------*/

            $scope.setModel = function (option, index, event) {
                if (event.metaKey || event.ctrlKey) {
                    if ($scope.liClass[index] === 'selected') {
                        $scope.liClass[index] = '';
                        $scope.rightSelectContacts.splice($scope.rightSelectContacts.indexOf(option.contact_id), 1);

                    } else {
                        $scope.liClass[index] = 'selected';
                        $scope.rightSelectContacts.push(option.contact_id);
                    }
                    $scope.lastSelectedOption = index;

                } else if (event.shiftKey) {
                    $scope.rightSelectedOptions = [];
                    $scope.liClass = new Array($scope.allContacts.length);
                    if ($scope.lastSelectedOption <= index) {
                        for (var i = $scope.lastSelectedOption; i <= index; i++) {
                            $scope.liClass[i] = 'selected';
                            $scope.rightSelectContacts.push($scope.selectedContactsList[i].contact_id);
                        }
                    } else if ($scope.lastSelectedOption >= index) {
                        for (var j = $scope.lastSelectedOption; j >= index; j--) {
                            $scope.liClass[j] = 'selected';
                            $scope.rightSelectContacts.push($scope.selectedContactsList[j].contact_id);
                        }
                    }

                } else {
                    $scope.rightSelectContacts = [];
                    $scope.lastSelectedOption = index;
                    $scope.liClass = new Array($scope.selectedContactsList.length);
                    $scope.liClass[index] = 'selected';
                    $scope.rightSelectContacts.push(option.contact_id);
                }
            };

            $scope.blurOptions = function () {
                $document.removeClass('noselect');
                for (var i = 0; i < $scope.liClass.length; i++) {
                    if ($scope.liClass[i] === 'selected') {
                        $scope.liClass[i] = 'greySelected';
                    }
                }
            };
            $scope.focusOptions = function (event) {
                $document.addClass('noselect');
                for (var i = 0; i < $scope.liClass.length; i++) {
                    if ($scope.liClass[i] === 'greySelected') {
                        $scope.liClass[i] = 'selected';
                    }
                }
            };

            /**-------------------function to add selected Contacts to 'Selected' tab-------------------*/
            $scope.addSelected = function () {
                $scope.errorMessage = '';
                if ($scope.leftSelectContacts.length > 0) {
                    angular.forEach($scope.leftSelectContacts, function (leftContact) {
                        $scope.contacts.forEach(function (contact, index) {
                            if (contact.contact_id === leftContact) {
                                $scope.selectedContactsList.push(contact);
                                $scope.contacts.splice(index, 1);
                            }
                        });
                    });
                    $scope.leftSelectContacts = [];
                }
                else {
                    if ($scope.contacts.length > 0) {
                        $scope.errorMessage = '*Please select at least one User to add';
                    }
                }
            };

            /**-------------------function to add all contacts to 'Selected' tab-------------------*/
            $scope.addAll = function () {
                if ($scope.contacts.length > 0) {
                    $scope.errorMessage = '';
                    var disabledContacts = [];
                    angular.forEach($scope.contacts, function (contact) {
                        if (!contact.disabled) {
                            $scope.selectedContactsList.push(contact);
                        }
                        else {
                            disabledContacts.push(contact);
                        }
                    });
                    $scope.contacts = disabledContacts;
                }
            };

            /**-------------------function to remove all contacts from 'Selected' tab---------------------------------*/
            $scope.removeAll = function () {
                if ($scope.selectedContactsList.length > 0) {
                    $scope.errorMessage = '';
                    angular.forEach($scope.selectedContactsList, function (contact) {
                        $scope.contacts.push(contact);
                    });
                    $scope.selectedContactsList = [];
                }
                $scope.liClass = new Array($scope.allContacts.length);
                $scope.lastSelectedOption = -1;
            };

            /**---------------------------function to remove selected Contacts from 'Selected' tab--------------------*/
            $scope.removeSelected = function () {
                $scope.errorMessage = '';
                if ($scope.rightSelectContacts.length > 0) {
                    angular.forEach($scope.rightSelectContacts, function (rightContact) {
                        $scope.selectedContactsList.forEach(function (contact, index) {
                            if (contact.contact_id === rightContact) {
                                $scope.contacts.push(contact);
                                $scope.selectedContactsList.splice(index, 1);
                            }
                        });
                    });
                    $scope.rightSelectContacts = [];
                    $scope.lastSelectedOption = -1;
                }
                else {
                    if ($scope.selectedContactsList.length > 0) {
                        $scope.errorMessage = '*Please select at least one User to remove';
                    }
                }
                $scope.liClass = new Array($scope.allContacts.length);
            };


            /**------------------function to filter contacts by contact Role filter----------------------------------*/

            $scope.filterByUserRole = function (userRoleFilter) {
                $scope.errorMessage = '';
                $scope.searchKeyword = '';
                $scope.contacts = getLeftContacts();
                if (userRoleFilter !== '') {
                    var filteredContacts = [];
                    angular.forEach($scope.contacts, function (item) {
                        if (item.contact_role_name === userRoleFilter) {
                            filteredContacts.push(item);
                        }
                    });
                    $scope.contacts = filteredContacts;
                }
            };

            var getLeftContacts = function () {
                var leftContacts = [];
                angular.forEach($scope.allContacts, function (item) {
                    var selected = false;
                    angular.forEach($scope.selectedContactsList, function (rightContact) {
                        if (item.contact_id === rightContact.contact_id) {
                            selected = true;
                        }
                    });
                    if (!selected) {
                        leftContacts.push(item);
                    }
                });
                return leftContacts;
            };

            /**-----------------------------function to filter Users by filter keyword-----------------------------*/

            $scope.filterByKeyword = function (keyword) {
                $scope.selectRole = '';
                $scope.contacts = getLeftContacts();
                if (keyword !== '') {
                    var filteredContacts = [];
                    var key = keyword.toLowerCase();
                    angular.forEach($scope.contacts, function (item) {
                        if (item.display_name.toLowerCase().indexOf(key) !== -1 || item.email_address.toLowerCase().indexOf(key) !== -1) {
                            filteredContacts.push(item);
                        }
                    });
                    $scope.contacts = filteredContacts;
                }
            };
            /**------------------function to set entity owner among the selected contacts------------------------------*/
            $scope.setEntityOwner = function (contactid) {
                $scope.entityOwnerId = contactid;
            };


            /**------------------function to assign users for the created group------------------------------*/
            $scope.assignUsers = function () {
                if ($scope.selectedContactsList.length === 0) {
                    $scope.errorMessage = '*Please select at least one user to assign';
                }
                else if ($scope.groupName === '') {
                    $scope.groupNameInvalid = true;
                }
                else {
                    busyIndicator.add('main-progress');
                    $scope.errorMessage = '';
                    $scope.groupNameInvalid = false;
                    var group = updateGroup();
                    group.success(function (response) {
                        busyIndicator.remove('main-progress');
                        $rootScope.assignGroupShow = false;
                        $window.location.href = '/groups/' + $scope.userId;
                    });
                    group.error(function (response) {
                        busyIndicator.remove('main-progress');
                        $scope.errorMessage = 'An Internal error has occurred during update';
                    });
                }
            };
            var updateGroup = function () {
                var groupParams = {};
                var entityGroupType = {};
                entityGroupType.id = '1';
                var assignedUserIds = [];
                angular.forEach($scope.selectedContactsList, function (prop) {
                    assignedUserIds.push(prop.contact_id);
                });
                groupParams.entityIds = $scope.groupDetails.entityIds;
                groupParams.entityGroupName = $scope.groupName;
                groupParams.entityOwnerId = $scope.entityOwnerId;
                groupParams.entityGroupType = entityGroupType;
                groupParams.assignedUserIds = assignedUserIds;
                return groupingService.updateEntityGroup($scope.groupId, groupParams);
            };
        };

        AssignGroupController.$inject = ['$scope', 'groupingService', '$window', '$rootScope', 'busyIndicator', '$document'];

        return AssignGroupController;

    });

