'use strict';

define(['angular',
    '../utilities/environmentUtil',
    '../utilities/dateTimeUtils'
], function (angular, environmentUtil, dateTimeUtils) {
    return angular.module('mc.core.utilities', [])          
            .service('environmentUtil', environmentUtil)
            .service('mc.utilites.dateTimeUtils', dateTimeUtils);
});