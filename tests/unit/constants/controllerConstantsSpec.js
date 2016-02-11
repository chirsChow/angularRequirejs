'use strict'

define(['angular',
        'angular-mocks',
        'mock-ajax',
        '/base/tests/unit/testHelper.js',
        'constants/controllerConstants'
],
function (angular, angularMocks, mockAjax, testHelper, controllerConstants) {
    
    describe('classified Reports Controller', function () {
        it('should have correct tabs Initialization', function () {

            expect(controllerConstants.tabs[0].title).toEqual('Property Performance');
            expect(controllerConstants.tabs[0].url).toEqual('/classified/report/posting-summary');

            expect(controllerConstants.tabs[1].title).toEqual('Daily Activity');
            expect(controllerConstants.tabs[1].url).toEqual('/classified/report/daily-activity');

            expect(controllerConstants.tabs[2].title).toEqual('Postings');
            expect(controllerConstants.tabs[2].url).toEqual('/classified/report/postings');

            expect(controllerConstants.tabs[3].title).toEqual('Posting Titles');
            expect(controllerConstants.tabs[3].url).toEqual('/classified/report/posting-titles');

            expect(controllerConstants.tabs[4].title).toEqual('Posting Descriptions');
            expect(controllerConstants.tabs[4].url).toEqual('/classified/report/posting-descriptions');

            expect(controllerConstants.tabs[5].title).toEqual('Posting Times');
            expect(controllerConstants.tabs[5].url).toEqual('/classified/report/posting-times');
        });
    });
});