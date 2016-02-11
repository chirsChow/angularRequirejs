'use strict';

define(['angular'],
    function (angular) {      
        return {
            httpVerb: { GET: 'GET', POST: 'POST', DELETE: 'DELETE', PUT: 'PUT' },
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            contentType:'application/json; charset=UTF-8',
            reportingApi: {
                properties: '/api/properties/',
                propertySummary: '/report/classified/property-summary',
                dailyActivity: '/report/classified/daily-activity',
                postings: '/report/classified/postings',
                postingTitles: '/report/classified/posting-titles',
                postingDescriptions: '/report/classified/posting-descriptions',
                postingTimes: '/report/classified/posting-times'
            },
            groupingApi: {
                groups: '/groups/',
                dailyActivity: '/classified/report/daily-activity?',
                companyContacts: '/api/contacts/company/'
            }

        };
    });