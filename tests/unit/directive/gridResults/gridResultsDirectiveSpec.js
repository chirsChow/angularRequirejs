'use strict';

define(['angular',
       'angular-mocks',
       'mock-ajax',
       'core/templates',
       '/base/tests/unit/testHelper.js',
        'directives/gridResults/_module',
       'directives/gridResults/gridResultsDirective'
],function (angular) {
    
  xdescribe('Directive: gridResults', function() {
	  var app,
	      element,
		  scope , 
		  rootScope, 
		  compile,
		  mockBackend; 
		
     	  beforeEach(module('mc.widgets.gridResults'));
     	  beforeEach(module('src/directives/gridResults/gridResults.html'));

     	  beforeEach(module(function ($provide) {     	    
     	      $provide.service('mc.utilites.dateTimeUtils', function () { });
     	      $provide.service( '$uibModal', function () { });
     	  }));
     
	      beforeEach(inject(function(_$compile_, _$rootScope_, _$httpBackend_, _$templateCache_) {
	        scope = _$rootScope_.$new();
			compile = _$compile_;
			mockBackend = _$httpBackend_;
	   	}));
 
     	  afterEach(function() {
			scope = compile = mockBackend  = element = undefined;
		  });

	 it('should return Html after compile if gridOptions is undefined', function() {	
       //create the element angularjs will replace with the directive template
		var formElement = angular.element('<grid-results grid-options="gridOptions"></grid-results>');
		var element = compile(formElement)(scope);
		scope.$digest();
		var templateHtml = element.html();
		console.log(templateHtml);
        expect(templateHtml).not.toBe('');
        expect(element.find('table').length).toEqual(1);  
	 });
});
});







