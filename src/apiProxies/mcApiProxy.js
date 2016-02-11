'use strict';

define(['angular'],
    function (angular) {
        var mcApiProxy = function (baseApiProxy, environmentUtil, serviceConstants) {

            this.get = function (restUrl) {              
                return baseApiProxy.getApiResponse(restUrl);
            };
        };

        mcApiProxy.$inject = ['mc.apiProxies.baseApiProxy', 'environmentUtil', 'mc.constants.serviceConstants'];

        return mcApiProxy;
    });