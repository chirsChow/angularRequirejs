/**
 * Classified Reports Transformation Service
 */

'use strict';

define(['angular'],
    function (angular) {

        var dataTransformationService = function (angularRestUtil, mcRestUtil) {
            var self = this;

            self.populateDailyActivityReportData = function(response) {
                var dailyActivityData = [];

                for (var i = 0; i < response.length; i++) {
                    var dailyActivityObj = {
                        date: response[i].date,
                        noVerifiedPosts: response[i].no_verified_posts,
                        noOfLeads: response[i].no_of_leads,
                        noOfClicks: response[i].no_of_clicks,
                        noOfPostings: response[i].no_of_postings,
                        leadsPerPost: response[i].leads_per_post,
                        clicksPerPost: response[i].clicks_per_post
                    };
                    dailyActivityData.push(dailyActivityObj);
                }

                return dailyActivityData;
            };

        };

        dataTransformationService.$inject = [];

        return dataTransformationService;
    });