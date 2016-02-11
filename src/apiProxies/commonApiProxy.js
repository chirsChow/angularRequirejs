'use strict';

define(['angular'],
    function (angular) {
        var commonApiProxy = function (baseApiProxy, serviceConstants) {
            var self = this;

            self.get = function (restUrl, params) {
                return baseApiProxy.postApiRequest(serviceConstants.httpVerb.GET, restUrl, params);
            };

            self.post = function (restUrl, params) {
                return baseApiProxy.postApiRequest(serviceConstants.httpVerb.POST, restUrl,  params);
            };

            self.put = function (restUrl, params) {
                return baseApiProxy.postApiRequest(serviceConstants.httpVerb.PUT, restUrl, params);
            };

            self.delete = function (restUrl, params) {
                return baseApiProxy.postApiRequest(serviceConstants.httpVerb.DELETE, restUrl, params);
            };
        };

        commonApiProxy.$inject = ['mc.apiProxies.baseApiProxy', 'mc.constants.serviceConstants'];

        return commonApiProxy;
    });