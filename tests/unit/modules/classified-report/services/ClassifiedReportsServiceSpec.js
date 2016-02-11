'use strict'

define(['angular',
        'angular-mocks',
        'mock-ajax',
        '/base/tests/unit/testHelper.js',
        'modules/classified-report/services/classifiedReportsService',
         'constants/serviceConstants',
        'utilities/environmentUtil',
        'utilities/dateTimeUtils',
],
function (angular, angularMocks, mockAjax, testHelper, ClassifiedReportsService, serviceConstants , environmentUtil, dateTimeUtils) {

    describe('Service : classified Reports', function () {
        var q,
            testUrl,           
            classifiedReportsService,
            mcApiProxyMock,
            commonApiProxyMock,
            dateTimeUtilsSvc;

        beforeEach(module(function ($provide) {
            $provide.service('mc.apiProxies.commonApiProxy', function () { });
            $provide.service('mc.apiProxies.mcApiProxy', function () { });
            $provide.constant('mc.constants.serviceConstants', serviceConstants);
            $provide.service('environmentUtil',environmentUtil);
            $provide.service('mc.utilites.dateTimeUtils', dateTimeUtils);
        }));

        beforeEach(inject(function ($injector, $q) {
            q = $q;
            mcApiProxyMock = $injector.get('mc.apiProxies.mcApiProxy');
            
            mcApiProxyMock.get = jasmine.createSpy('getSpy').and.callFake(
              function () {
                  var testItems = { 'hello': 'asd' }
                  var deferred = q.defer();
                  deferred.resolve(testItems);
                  return deferred.promise;
              });

            commonApiProxyMock = $injector.get('mc.apiProxies.commonApiProxy');

            commonApiProxyMock.post = jasmine.createSpy('postSpy').and.callFake(
              function () {
                  var testItems = { 'hello': 'asd' }
                  var deferred = q.defer();
                  deferred.resolve(testItems);
                  return deferred.promise;
              });

            classifiedReportsService = new ClassifiedReportsService(commonApiProxyMock, mcApiProxyMock, serviceConstants, null);
        }));

        afterEach(function() {
            classifiedReportsService = null;
         });

        describe('check if the service is initialized', function () {

            beforeEach(function () {
                testUrl = '/api/properties/512835868'
            });
            
            it('check to see that method defined in service', function () {   
             expect(angular.isObject(classifiedReportsService)).toBe(true);
             expect(angular.isFunction(classifiedReportsService.getPropertiesByContactId)).toBe(true);
             expect(angular.isFunction(classifiedReportsService.getPropertySummaryReport)).toBe(true);
             expect(angular.isFunction(classifiedReportsService.getDailyActivityReport)).toBe(true);
             expect(angular.isFunction(classifiedReportsService.getPostingsReport)).toBe(true);
             expect(angular.isFunction(classifiedReportsService.getPostingTitlesReport)).toBe(true);
             expect(angular.isFunction(classifiedReportsService.getPostingDescriptionsReport)).toBe(true);
             expect(angular.isFunction(classifiedReportsService.getPostingTimesReport)).toBe(true);
             expect(angular.isFunction(classifiedReportsService.setProperty)).toBe(true);
             expect(angular.isFunction(classifiedReportsService.getProperty)).toBe(true); 
          });
    
           describe('check all method in service return promise object',function(){
          
              it('Verify if classifiedReportsService.getPropertySummaryReport return a promise',function(){
                      var report = classifiedReportsService.getPropertiesByContactId('512835868');
                         expect(angular.isObject(report)).toBe(true);
                         expect(angular.isFunction(report.then)).toBe(true);
              });

               it('Verify if classifiedReportsService.getPropertySummaryReport return a promise',function(){
                      var report = classifiedReportsService.getPropertySummaryReport();
                         expect(angular.isObject(report)).toBe(true);
                         expect(angular.isFunction(report.then)).toBe(true);


              });

               it('Verify if classifiedReportsService.getDailyActivityReport return a promise',function(){
                      var report = classifiedReportsService.getDailyActivityReport();
                         expect(angular.isObject(report)).toBe(true);
                         expect(angular.isFunction(report.then)).toBe(true);
              });
              
               it('Verify if classifiedReportsService.getPostingsReport return a promise',function(){
                      var report = classifiedReportsService.getPostingsReport();
                         expect(angular.isObject(report)).toBe(true);
                         expect(angular.isFunction(report.then)).toBe(true);
              });

               it('Verify if classifiedReportsService.getPostingTitlesReport return a promise',function(){
                      var report = classifiedReportsService.getPostingTitlesReport();
                         expect(angular.isObject(report)).toBe(true);
                         expect(angular.isFunction(report.then)).toBe(true);
              });

               it('Verify if classifiedReportsService.getPostingDescriptionsReport return a promise',function(){
                      var report = classifiedReportsService.getPostingDescriptionsReport();
                         expect(angular.isObject(report)).toBe(true);
                         expect(angular.isFunction(report.then)).toBe(true);
              }); 
            
               it('Verify if classifiedReportsService.getPostingTimesReport return a promise',function(){
                      var report = classifiedReportsService.getPostingTimesReport();
                         expect(angular.isObject(report)).toBe(true);
                         expect(angular.isFunction(report.then)).toBe(true);
              }); 
                      
           });
           
          describe('setProperty',function(){
                it('check the property is undefined when no property value send',function(){
                       classifiedReportsService.setProperty();
                       expect(classifiedReportsService.property).toBe(undefined);
                });

                it('check the property is defined when propery value is passed',function(){
                       classifiedReportsService.setProperty('telcel');
                       expect(classifiedReportsService.property).toBe('telcel');
                });
              
             });

            describe('getProperty',function(){   
                it('check the property value is present before getproperty call',function(){
                       expect(classifiedReportsService.property).toBe(undefined);
                       classifiedReportsService.setProperty('telcel');
                       expect(classifiedReportsService.getProperty()).toBe('telcel');
                });

             })
        
         });

    });
});

