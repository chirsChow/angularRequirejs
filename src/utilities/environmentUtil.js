/**
 * Created by RVankayala on 8/14/2015.
 *
 * EnvironmentUtil to get MC URL and API URL.
 *
 */
'use strict';

define(['angular'],
    function (angular) {
        var environmentUtil = function ($location) {
            /**
             * Location url.
             */
            function getUrl()
            {
                var url = $location.protocol() + '://' + $location.host();

                if ($location.port() !== '80') {
                    url += ':' + $location.port();
                }
                return url;
            }

            return {

                /**
                 * Configures the CCS url.
                 */
                getMCUrl: function () {

                    return getUrl() + '/mcrequest';
                },

                /**
                 * Configures the API url.
                 */
                getAPIUrl: function () {

                    return getUrl().replace('mc', 'api').replace('rentengine', 'mynewplace') + '/v2';
                },
                getMCAppUrl: function () {
                    return getUrl();
                }
            };
        };

        environmentUtil.$inject = ['$location'];

        return environmentUtil;
    });