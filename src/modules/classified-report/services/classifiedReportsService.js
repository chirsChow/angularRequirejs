/**
 * Classified Reports Service
 */
'use strict';

define(['angular'],
    function (angular) {

        var classifiedReportsService = function (commonApiProxy, mcApiProxy, serviceConstants, properties) {
            var self = this, property = {};

                /**
                 * REST call to retrieve assigned properties for a logged in contact.
                 * @returns properties data.
                 *
                 */
            self.getPropertiesByContactId = function (pathParam) {
                //prepare url to retrieve property summary report.                
                return mcApiProxy.get(serviceConstants.reportingApi.properties + pathParam + '?leadChannelEnabled=true');
            };
                /**
                 * REST call to retrieve property summary report.
                 * @returns report data.
                 *
                 */
            self.getPropertySummaryReport = function (requestParam) {
                //prepare url to retrieve property summary report.
                return commonApiProxy.post(serviceConstants.reportingApi.propertySummary, requestParam);
            };
                /**
                 * REST call to retrieve daily activity report.
                 * @returns report data.
                 *
                 */
            self.getDailyActivityReport = function (requestParam) {
                //prepare url to retrieve daily activity report.
                return commonApiProxy.post(serviceConstants.reportingApi.dailyActivity, requestParam);
            };
                /**
                 * REST call to retrieve postings report.
                 * @returns report data.
                 *
                 */
            self.getPostingsReport =  function (requestParam) {
                //prepare url to retrieve postings report.
                return commonApiProxy.post(serviceConstants.reportingApi.postings, requestParam);
            };
                /**
                 * REST call to retrieve posting titles report.
                 * @returns report data.
                 *
                 */
            self.getPostingTitlesReport = function (requestParam) {
                //prepare url to posting titles report.
                return commonApiProxy.post(serviceConstants.reportingApi.postingTitles, requestParam);
            };

                /**
                 * REST call to retrieve posting descriptions report.
                 * @returns report data.
                 *
                 */
            self.getPostingDescriptionsReport = function (requestParam) {
                //prepare url to retrieve posting descriptions report.
                return commonApiProxy.post(serviceConstants.reportingApi.postingDescriptions, requestParam);
            };
                /**
                 * REST call to retrieve posting times report.
                 * @returns report data.
                 *
                 */
            self.getPostingTimesReport = function (requestParam) {
                //prepare url to retrieve posting times report.
                return commonApiProxy.post(serviceConstants.reportingApi.postingTimes, requestParam);
            };

            self.setProperty = function (propertyO) {
                this.property = propertyO;
            };

            self.getProperty= function () {
                return this.property;
            };
        };

        classifiedReportsService.$inject = ['mc.apiProxies.commonApiProxy', 'mc.apiProxies.mcApiProxy', 'mc.constants.serviceConstants'];

        return classifiedReportsService;
    });
