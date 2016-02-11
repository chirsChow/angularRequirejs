'use strict';

define(['angular',
    '../routes/classifiedReportsRoutes',
    '../routes/entityGroupingRoutes'
], function (angular, classifiedReportsRoute, entityGroupingRoute) {
    return angular.module('mc.core.routes', ['ui.router'])
        .config(['$stateProvider', '$urlRouterProvider', '$locationProvider',
            function ($stateProvider, $urlRouterProvider, $locationProvider) {

                debugger;

                var route = {
                    templateUrl: 'angular/build/src/modules/classified-report/views/postings.html',
                    controller: 'mc.controllers.classifiedReportsController'
                };

                $stateProvider.state('report', {
                    url: '/classified/report',
                    templateUrl: route.templateUrl,
                    //templateProvider: function ($templateCache) {
                    //    return $templateCache.get(route.templateUrl);
                    //},
                    controller: route.controller
                }).state('posting-summary', {
                    url: '/classified/report/posting-summary',
                    templateUrl: route.templateUrl,
                    controller: route.controller
                }).state('daily-activity', {
                    url: '/classified/report/daily-activity',
                    templateUrl: route.templateUrl,
                    controller: route.controller
                }).state('postings', {
                    url: '/classified/report/postings',
                    templateUrl: route.templateUrl,
                    controller: route.controller
                }).state('posting-descriptions', {
                    url: '/classified/report/posting-descriptions',
                    templateUrl: route.templateUrl,
                    controller: route.controller
                }).state('posting-titles', {
                    url: '/classified/report/posting-titles',
                    templateUrl: route.templateUrl,
                    controller: route.controller
                }).state('posting-times', {
                    url: '/classified/report/posting-times',
                    templateUrl: route.templateUrl,
                    controller: route.controller
                });

                $urlRouterProvider.otherwise('/classified/report');

                //$routeProvider.
                //    when('/classified/report/:reportType', {
                //        templateUrl: '../../angular/src/modules/classified-report/views/postings.html',
                //        controller: 'mc.controllers.classifiedReportsController'
                //    }).
                //    when('/classified/report', {
                //        templateUrl: '../../angular/src/modules/classified-report/views/postings.html',
                //        controller: 'mc.controllers.classifiedReportsController'
                //    }).
                //    otherwise({
                //        redirectTo: '/classified/report'
                //    });

                // use the HTML5 History API
                $locationProvider.html5Mode({
                    enabled: true,
                    requireBase: true
                });
            }]);
});