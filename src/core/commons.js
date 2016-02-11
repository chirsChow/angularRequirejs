'use strict';

define(['angular',
        '../common/baseController'
],
function (angular, baseController) {
    return angular.module('mc.core.commons', [])
        .constant('mc.commons.baseController', baseController);
});