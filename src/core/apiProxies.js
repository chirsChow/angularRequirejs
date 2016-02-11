'use strict';

define(['angular',
        '../apiProxies/baseApiProxy',
        '../apiProxies/commonApiProxy',
        '../apiProxies/mcApiProxy'
],
    function (angular, baseApiProxy, commonApiProxy, mcApiProxy) {

        return angular.module('mc.core.apiProxies', [])
            .service('mc.apiProxies.baseApiProxy', baseApiProxy)
            .service('mc.apiProxies.commonApiProxy', commonApiProxy)
            .service('mc.apiProxies.mcApiProxy', mcApiProxy);
    });