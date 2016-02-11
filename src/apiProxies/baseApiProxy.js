'use strict';

define(['angular'],
    function (angular) {
        var baseApiProxy = function ($http, $q, environmentUtil, serviceConstants) {
            var self = this;

            self.getApiResponse = function (restUrl) {
                var deferredGet = $q.defer();
                var httpConfig = {
                    method: serviceConstants.httpVerb.GET,
                    url: environmentUtil.getMCAppUrl() + restUrl
                };

                $http(httpConfig).success(function (data) {
                    deferredGet.resolve(data);
                }).error(function (error) {
                    deferredGet.resolve(error);
                });

                return deferredGet.promise;
            };

            self.postApiRequest = function (method, restUrl, params) {
                var deferredPost = $q.defer();
                var data = {
                    method: method,
                    url: environmentUtil.getAPIUrl() + restUrl
                };                           

                if (method !== serviceConstants.httpVerb.GET) {
                    data = {
                        method: method,
                        url: environmentUtil.getAPIUrl() + restUrl,
                        doEmpAuth: true,
                        contenttype: serviceConstants.contentType,
                        params: params
                    };
                }               

                var httpConfig = {
                    url: environmentUtil.getMCUrl(),
                    dataType: 'json',
                    method: serviceConstants.httpVerb.POST,
                    params: data,
                    headers: serviceConstants.headers
                };

                $http(httpConfig)
                    .success(function (response) {
                        deferredPost.resolve(response);
                    }).error(function (error) {
                        deferredPost.resolve(error);
                    });

                return deferredPost.promise;
            };
        };

        baseApiProxy.$inject = ['$http', '$q', 'environmentUtil', 'mc.constants.serviceConstants'];
       
        return baseApiProxy;
    });