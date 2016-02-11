/**
 * Entity Grouping Service
 */
mainApp.service('groupingService', ['angularRestUtil', 'mcRestUtil', function (angularRestUtil, mcRestUtil) {
    var userId = '';
    var group = new Object();
    var properties = [];
    return {
        /**
         * REST call to retrieve property summary report.
         * @returns report data.
         *
         */
        getEntityGroupsById: function (requestParam) {
            //prepare url to retrieve entity groups.
            console.log("@INside retrieveEntityGroupsById", requestParam);
            return angularRestUtil.doGet('/groups/' + requestParam);
        },
        /**
         * REST call to retrieve daily activity report.
         * @returns report data.
         *
         */
        getPostingTitlesReport: function (requestParam) {
            //prepare url to retrieve daily activity report.
            return angularRestUtil.doGet('/classified/report/daily-activity?' + requestParam);
        },
        /**
         * REST call to retrieve postings report.
         * @returns report data.
         *
         */
        getPostingTitlesReport: function (requestParam) {
            //prepare url to retrieve postings report.
            return angularRestUtil.doGet('/classified/report/postings?' + requestParam);
        },
        /**
         * REST call to retrieve posting titles report.
         * @returns report data.
         *
         */
        getPostingTitlesReport: function (requestParam) {
            //prepare url to posting titles report.
            return angularRestUtil.doGet('/classified/report/posting-titles?' + requestParam);
        },

        /**
         * REST call to retrieve posting descriptions report.
         * @returns report data.
         *
         */
        getPostingDescriptionsReport: function (requestParam) {
            //prepare url to retrieve posting descriptions report.
            return angularRestUtil.doGet('/classified/report/posting-descriptions?' + requestParam);
        },
        /**
         * REST call to retrieve posting times report.
         * @returns report data.
         *
         */
        getPostingTitlesReport: function (requestParam) {
            //prepare url to retrieve posting times report.
            return angularRestUtil.doGet('/classified/report/posting-times?' + requestParam);
        },

        getEntityGroupsByGroupId: function (requestParam) {
            //prepare url to retrieve entity groups.
            return angularRestUtil.doGet('/group/' + requestParam);
        },

        saveGroup: function (requestbody) {
            return angularRestUtil.doPost('/group', requestbody);
        },

        updateEntityGroup: function (requestParam, requestbody) {
            return angularRestUtil.doPut('/group/' + requestParam, requestbody);
        },

        deleteGroup: function(pathParam){
            return angularRestUtil.doDelete('/group/'+ pathParam);
        },

        loadProperties: function (pathParam) {
            return mcRestUtil.doMCGet('/api/properties/' + pathParam);
        },

        loadUsers: function (pathParam) {
            return mcRestUtil.doMCGet('/api/contacts/company/' + pathParam);
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

        setPropertyDetails: function(props){
            properties = props;
        },

        getPropertyDetails: function(){
            return properties;
        }
    }
}

]);


