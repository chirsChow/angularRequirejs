'use strict';

define([
  'angular',
  'src/services/httpInterceptorService',

  'angular-route',
  'angular-animate',
  'angular-cookies',
  'angular-tooltips',
  'ui-router',
  'ui-bootstrap',  
  'ui-bootstrap-tpl',
  'ui-grid',

   'src/core/apiProxies',
   'src/core/services',
   'src/core/routes',
   'src/core/constants',
   'src/core/providers',
   'src/core/commons',
   'src/core/filters',
   'src/core/utilities',
   'src/core/directives'
],
  function (angular, httpInterceptorService) {

      return angular.module('mc.core.module', [
               'ngRoute',
               'ngCookies',
               'ui.bootstrap',

               'mc.core.commons',
               'mc.core.routes',
               'mc.core.filters',
               'mc.core.constants',
               'mc.core.providers',
               'mc.core.apiProxies',
               'mc.core.services',
               'mc.core.utilities',
               'mc.core.widgets'
      ]).directive('waitIndicator', function ($rootScope) {
          return function ($scope, element, attrs) {             
              $scope.$on('loader_show', function () {
                  return element ? element.attr('style','display:block;'): null;
              });
              return $scope.$on('loader_hide', function () {
                  return element ? element.attr('style','display:none;'): null;
              });
          };
      }).service('mc.services.httpInterceptorService', httpInterceptorService)
          .config(['$httpProvider', function ($httpProvider) {
             $httpProvider.interceptors.push('mc.services.httpInterceptorService');
          }])
          .run(function ($cookies) {
          $cookies.property_id = 0;
      });
  });