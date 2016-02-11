'use  strict';

define(['angular',
        'angular-mocks',
        'modules/classified-report/controllers/classifiedReportsController',
        'constants/serviceConstants',
        'constants/controllerConstants',
        'utilities/dateTimeUtils',
        '/base/tests/unit/testHelper.js'
], function (angular, mocks, classifedReportsController,
    serviceConstants, controllerConstants, dateTimeUtils, testHelper) {

    describe('Classified Reports View', function () {
        var app, compile,
                 scope, location, ctrl, response,
                 q,
                 rootScope;

        var templateHtml, // raw markup
            templateElement, // dom element created from markup
            templateDom; //

        //load all modules, including the html template, needed to support the test
        beforeEach(function () {
            app = angular.module("testModule", []);
            app.controller('classifedReportsController', classifedReportsController);
        });

        beforeEach(module('testModule', 'src/modules/classified-report/views/postings.html'));

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

        beforeEach(inject(function ($rootScope, $controller, $compile, $location, $injector, $q, $filter, $templateCache) {
            compile = $compile;
            scope = $rootScope.$new();
            rootScope = $rootScope;
            location = $location,
            filter = $filter;
            cookies = function () { };
            q = $q;
            stateParams = {};
            templateHtml = $templateCache.get('src/modules/classified-report/views/postings.html');
            
            serviceConstants = $injector.get('mc.constants.serviceConstants');
            controllerConstants = $injector.get('mc.constants.controllerConstants');
                       

            ctrl = $controller(classifedReportsController, {
                $rootScope: rootScope,
                $scope: scope,
                $stateParams: stateParams,
                $location: location,
                $filter: filter,
                $cookies: {},
                controllerConstants: controllerConstants,
                classifiedReportsService: null,
                dateTimeUtils: null
            });

            templateElement = angular.element(templateHtml);
            templateDom = compile(templateElement)(scope);
            scope.$digest();
        }));

        afterEach(function () {
            scope.$destroy();
            compile = null;
            q = null;
            angular.element(templateDom).remove();
        });        

        describe('tab panels', function () {
            it('should be defined', function () {
                expect(templateDom.find('tab-panels')).toBeDefined();
            });

            it('should have tabs attribute', function () {
                expect(templateDom.find('tab-panels').attr('tabs')).toBeDefined();
            });

            it('should have activetab attribute', function () {
                expect(templateDom.find('tab-panels').attr('activetab')).toBeDefined();
            });
        });


        describe('craigslistReportArea', function () {
            it('should be defined', function () {
                expect(templateDom.find('#craigslistReportArea')).toBeDefined();
            });


            describe('grid  filters', function () {
                it('should be defined', function () {
                    expect(templateDom.find('grid-filters')).toBeDefined();
                });

                it('should have selected-filters attr specified', function () {
                    expect(templateDom.find('grid-filters').attr('selected-filters')).toBeDefined();
                    //expect(scope.books).toBeDefined();
                });

                it('should have selected-filters attr specified and value equal to selectedFilters', function () {
                    expect(templateDom.find('grid-filters').attr('selected-filters')).toBe('selectedFilters');
                    // expect(scope.params).toBeDefined();
                });
            });

            describe('daily Graph', function () {
                it('should be defined', function () {
                    expect(templateDom.find('#dailyGraph')).toBeDefined();
                });
            });


            describe('grid results', function () {
                it('should be defined', function () {
                    expect(templateDom.find('grid-results')).toBeDefined();
                });

                it('should have grid-options attr specified', function () {
                    expect(templateDom.find('grid-results').attr('grid-options')).toBeDefined();                    
                });

                it('should have grid-options with attr value gridOptions', function () {
                    expect(templateDom.find('grid-results').attr('grid-options')).toBe('gridOptions');
                });
            });
        });
    });
});