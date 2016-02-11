'use strict';

define(['angular'],
    function (angular) {
        return {
            tabs:[{
                url: '/classified/report/posting-summary',
                title: 'Property Performance'
            }, {
                url: '/classified/report/daily-activity',
                title: 'Daily Activity'
            }, {
                url: '/classified/report/postings',
                title: 'Postings'
            }, {
                url: '/classified/report/posting-titles',
                title: 'Posting Titles'
            }, {
                url: '/classified/report/posting-descriptions',
                title: 'Posting Descriptions'
            }, {
                url: '/classified/report/posting-times',
                title: 'Posting Times'
            }],
            dateRanges: [{
                value: 7,
                name: 'Last 7 days'
            }, {
                value: 15,
                name: 'Last 15 days'
            }, {
                value: 30,
                name: 'Last 30 days'
            }, {
                value: 60,
                name: 'Last 60 days'
            }, {
                value: 90,
                name: 'Last 90 days'
            }, {
                value: 'Last Month',
                name: 'Last Month'
            }, {
                value: 'Month To Date',
                name: 'Month To Date'
            }, {
                value: 'Custom',
                name: 'Custom'
            }],
            defaultProperty : {
                property_id: 0,
                property_key: 'all',
                property_name: 'All Properties'
            },
            defaultGroup : {
                id:0,
                entityGroupName:'Select a Group'
            }
        };
    });