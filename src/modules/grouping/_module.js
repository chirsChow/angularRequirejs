/**
 * Created module application for classified reports.
 * @type {module}
 */
'use strict';

define(['angular',
        './controllers/assignGroupController',
        './controllers/createGroupController',
        './controllers/editGroupController',
        './controllers/groupingController',
        './services/groupingService'
],
    function (angular, assignGroupController, createGroupController, editGroupController, groupingController, groupingService) {
        return angular.module('mc.modules.entityGrouping', ['ngRoute', '720kb.tooltips'])
             .controller('mc.controller.assignGroupController', assignGroupController)
             .controller('mc.controller.createGroupController', createGroupController)
             .controller('mc.controller.editGroupController', editGroupController)
             .controller('mc.controller.groupingController', groupingController)
             .service('mc.services.groupingService', groupingService)
            .run(function ($rootScope) {
                $rootScope.createGroupShow = false;
                $rootScope.assignGroupShow = false;
                $rootScope.editGroupShow = false;
                $rootScope.assignUserPrivilege = false;
        });
    });

