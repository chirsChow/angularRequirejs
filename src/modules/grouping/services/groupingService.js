/**
 * Entity Grouping Service
 */
'use strict';

define(['angular'],
    function (angular) {

        var groupingService =  function (commonApiProxy, mcApiProxy, serviceConstants) {
            var userId = '';
            var group = {};
            var properties = [];
            return {
                /**
                 * REST call to retrieve property summary report.
                 * @returns report data.
                 *
                 */
                getEntityGroupsById: function (requestParam) {
                    //prepare url to retrieve entity groups.                    
                    return commonApiProxy.get(serviceConstants.groupingApi.groups + requestParam);
                },
                /**
                 * REST call to retrieve daily activity report.
                 * @returns report data.
                 *
                 */
                getPostingTitlesReport: function (requestParam) {
                    //prepare url to retrieve daily activity report.
                    return commonApiProxy.get(serviceConstants.groupingApi.dailyActivity + requestParam);
                },                

                getEntityGroupsByGroupId: function (requestParam) {
                    //prepare url to retrieve entity groups.
                    return commonApiProxy.get(serviceConstants.groupingApi.groups + requestParam);
                },

                saveGroup: function (requestbody) {
                    return commonApiProxy.post(serviceConstants.groupingApi.groups, requestbody);
                },

                updateEntityGroup: function (requestParam, requestbody) {
                    return commonApiProxy.post(serviceConstants.groupingApi.groups + requestParam, requestbody);
                },

                deleteGroup: function (pathParam) {
                    return commonApiProxy.delete(serviceConstants.groupingApi.groups + pathParam);
                },

                loadProperties: function (pathParam) {
                    return mcApiProxy.get(serviceConstants.reportingApi.properties + pathParam);
                },

                loadUsers: function (pathParam) {
                    return mcApiProxy.get(serviceConstants.groupingApi.companyContacts + pathParam);
                },

                setUserId: function (user) {
                    userId = user;
                },

                getUserId: function () {
                    return userId;
                },

                setGroupDetails: function (groupDet) {
                    group = groupDet;
                },

                getGroupDetails: function () {
                    return group;
                },

                setPropertyDetails: function (props) {
                    properties = props;
                },

                getPropertyDetails: function () {
                    return properties;
                }
            };
        };

        groupingService.$inject = ['mc.apiProxies.commonApiProxy', 'mc.apiProxies.mcApiProxy', 'mc.constants.serviceConstants'];

        return groupingService;
    });


