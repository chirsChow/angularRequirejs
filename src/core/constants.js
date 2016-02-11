'use strict';

define(['angular',
        '../constants/serviceConstants',
        '../constants/controllerConstants'
],
function (angular, serviceConstants, controllerConstants) {
    return angular.module('mc.core.constants', [])
        .constant('mc.constants.serviceConstants', serviceConstants)
        .constant('mc.constants.controllerConstants', controllerConstants);
});