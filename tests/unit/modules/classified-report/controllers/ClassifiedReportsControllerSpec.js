'use strict'

define(['angular',
        'angular-mocks',
        'mock-ajax',
        '/base/tests/unit/testHelper.js',
        'modules/classified-report/controllers/classifiedReportsController',
        'constants/serviceConstants',
        'constants/controllerConstants',
        'utilities/dateTimeUtils'
],
function (angular, angularMocks, mockAjax, testHelper, classifiedReportsController, serviceConstants, controllerConstants, dateTimeUtils) {

    describe('classified Reports Controller', function () {
        var compile,
            scope,
            ctrl,
            rootScope,
            location,
            filter,
            cookies,
            stateParams,
            classifiedReportsServiceMock,
            q,
            dateTimeUtilsSvc;

        beforeEach(module(function ($provide) {
            $provide.service('mc.services.classifiedReportsService', function () {
                this.getPropertySummaryReport = function () { };

                return this;
            });
            $provide.service('mc.utilites.dateTimeUtils', dateTimeUtils);
            $provide.service('mc.services.mcClassifiedReportChartUtil', function () { });
            $provide.constant('mc.constants.serviceConstants', serviceConstants);
            $provide.constant('mc.constants.controllerConstants', controllerConstants);
        }));

        beforeEach(inject(function ($rootScope, $controller, $compile, $location, $injector, $q, $filter) {
            compile = $compile;
            scope = $rootScope.$new();
            rootScope = $rootScope;
            location = $location,
            filter = $filter;
            cookies = function () { };
            q = $q;
            stateParams = {};

            classifiedReportsServiceMock = $injector.get('mc.services.classifiedReportsService');

            classifiedReportsServiceMock.getPropertySummaryReport = jasmine.createSpy('getPropertySummaryReportSpy').and.callFake(
              function () {
                  var testItems = { 'hello': 'asd' }
                  var deferred = q.defer();
                  deferred.resolve(testItems);
                  return deferred.promise;
              });

            ctrl = $controller(classifiedReportsController, {
                $rootScope: rootScope,
                $scope: scope,
                $stateParams: stateParams,
                $location: location,
                $filter: filter,
                $cookies: {},
                controllerConstants: controllerConstants,
                classifiedReportsService: classifiedReportsServiceMock,
                dateTimeUtils: dateTimeUtilsSvc
            });

        }));

        afterEach(function () {
            scope = rootScope = location = compile = stateParams = undefined;
        });

        describe('should Initialization', function () {

            it('Initialization of controller', function () {
                expect(ctrl.generateDateWiseReport).toBeDefined();
                expect(ctrl.propertyPerformanceReport).toBeDefined();
                expect(scope.activeTab).toBeDefined();
                expect(scope.gridOptions).toBeDefined();
            });

            it('should have tabs defination inside scope ', function () {
                expect(scope.tabs).toBeDefined();
            });

        });

        describe('should', function () {
            it('have no of tabs equal to 6', function () {                
                expect(scope.tabs.length).toEqual(6);
            });

        });

        describe('should call', function () {
            it('classifiedReportsController.generateDateWiseReport when activeTab changes', function () {
                expect(scope.activeTab).toBeDefined();
                spyOn(ctrl, 'generateDateWiseReport');
                scope.activeTab = { url: "/classified/report/posting-summary", title: "Property Performance", index: 1, isActive: true, reportType: "posting-summary" };
                scope.$digest();
                expect(scope.reportType).toBe('posting-summary');
            });

            it('propertyPerformanceReport report method when reportType is  posting-summary', function () {

                spyOn(ctrl, 'propertyPerformanceReport');
                scope.reportType = 'posting-summary';
                ctrl.generateDateWiseReport();
                expect(ctrl.propertyPerformanceReport).toHaveBeenCalledWith();
            });
            it('postingsReport method when scope.reportType is postings', function () {

                spyOn(ctrl, 'postingsReport');
                scope.reportType = 'postings';
                ctrl.generateDateWiseReport();
                expect(ctrl.postingsReport).toHaveBeenCalledWith();
            });
            it('dailyActivityReport method when reportType is daily-activity', function () {


                spyOn(ctrl, 'dailyActivityReport');
                scope.reportType = 'daily-activity';
                ctrl.generateDateWiseReport();
                expect(ctrl.dailyActivityReport).toHaveBeenCalledWith();
            });

            it('postingTitlesReport method when reportType is posting-titles', function () {

                spyOn(ctrl, 'postingTitlesReport');
                scope.reportType = 'posting-titles';
                ctrl.generateDateWiseReport();
                expect(ctrl.postingTitlesReport).toHaveBeenCalledWith();
            });
            it('postingDescriptionsReport method when reportType is posting-descriptions', function () {

                spyOn(ctrl, 'postingDescriptionsReport');
                scope.reportType = 'posting-descriptions';
                ctrl.generateDateWiseReport();
                expect(ctrl.postingDescriptionsReport).toHaveBeenCalledWith();
            });

            it('postingTimesReport method when reportType is posting-times', function () {
                spyOn(ctrl, 'postingTimesReport');
                scope.reportType = 'posting-times';
                ctrl.generateDateWiseReport();
                expect(ctrl.postingTimesReport).toHaveBeenCalledWith();

            });
        });

        describe('propertyPerformanceReport', function () {
            it('Verify if gridOptions data is defined', function () {
                var report = classifiedReportsServiceMock.getPropertySummaryReport();
                expect(angular.isObject(report)).toBe(true);
                expect(angular.isFunction(report.then)).toBe(true);
                report.then(function (data) {
                    scope.gridOptions.data = data;
                    expect(scope.gridOptions.data).toBeDefined();
                })
            });
        });

    });
});

