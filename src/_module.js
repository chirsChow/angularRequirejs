'use strict';

define([
  'angular',
  'q',
  'lodash',

  'src/core/_module',
  'src/modules/classified-report/_module',
  'src/modules/grouping/_module'
],
  function (angular, q, _) {

      //var militaryWaitTimeApp = angular.module('militaryWaitTimeApp', []);

      angular.module('mainApp', [
          'mc.core.module',

          'mc.modules.classifiedReports',
          'mc.modules.entityGrouping'

      ]).config(['$httpProvider', function ($httpProvider) {

      }]).run(function ($http, $templateCache) {
         
      });

      var bootstrap = function (app) {
          var deferred = q.defer();
          var injector = angular.bootstrap(angular.element(document.querySelector('#AngularApp')), ['mainApp']);
          deferred.resolve([injector, app]);

          return deferred.promise;
      };

      return { bootstrap: bootstrap };
  });

