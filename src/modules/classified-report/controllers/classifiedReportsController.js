/**
 * Created by RVankayala on 8/5/2015.
 */
'use strict';

define(['angular'],
    function (angular, jQuery) {
        var classifiedReportsController = function ($rootScope, $scope, $stateParams, $location, $filter, $cookies, controllerConstants, classifiedReportsService, dateTimeUtils, mcClassifiedReportChartUtil) {
            var self = this;
            var date = new Date();

            $scope.contactId = angular.element(document.querySelector('#contactId')).prop('value');
            $scope.propertyId = angular.element(document.querySelector('#propertyId')).prop('value');
            $scope.groupId = angular.element(document.querySelector('#groupId')).prop('value');

            $scope.activeTab = {};
            $scope.gridOptions = {};
            $scope.MAX_DATA_POINTS = 20;
            $scope.selectedFilters = {
                group: null,
                property: {
                    property_key: ''
                },
                propertyIds: [],
                dateRange: {
                    startDate: dateTimeUtils.formatDate(new Date(date.getFullYear(), date.getMonth() - 1, 1)),
                    endDate: dateTimeUtils.formatDate(new Date(date.getFullYear(), date.getMonth(), 0))
                }
            };

            $scope.model = {};

            //Data preparation for Daily Activity Report.
            $scope.classifiedReportData = {
                dailyActivityData: [
                    {
                        date: null,
                        noVerifiedPosts: null,
                        noOfLeads: null,
                        noOfClicks: null,
                        noOfPostings: null,
                        leadsPerPost: null,
                        clicksPerPost: null
                    }
                ]
            };

            //controllerConstants.tabs;
            $scope.tabs = controllerConstants.tabs;

            $scope.$watch('activeTab', function (item) {
                $scope.reportType = item.reportType;
            });

            $scope.$watchCollection('selectedFilters', function (item, oldItem) {

                if (item === oldItem) {
                    return;
                }

                if (item.showVerified) {
                    $scope.gridOptions.data = $filter('verifiedPosts')($scope.gridOptions.data, $scope.gridOptions);
                }

                if (item && item.property && item.property.property_id) {
                    $cookies.property_id = item.property.property_id;
                }

                self.buildRequestParams(item);
                self.generateDateWiseReport();
            });

            self.buildRequestParams = function (item) {

                var propertyId = +$cookies.property_id;

                $scope.requestParam = {
                    contactId: $scope.contactId
                };

                if (item) {
                    if (item.group && $scope.requestParam.groupId) {
                        $scope.requestParam.groupId = item.group.id;
                    }

                    if (item.propertyIds && item.propertyIds.length) {
                        $scope.requestParam.propertyIds = item.propertyIds;
                    } else if (propertyId) {
                        $scope.requestParam.propertyIds = [];
                        $scope.requestParam.propertyIds.push(+$cookies.property_id);
                    }

                    if (item.dateRange) {
                        $scope.startDateObj = new Date(Date.parse(item.dateRange.startDate));
                        $scope.endDateObj = new Date(Date.parse(item.dateRange.endDate));

                        $scope.requestParam.startDate = item.dateRange.startDate;
                        $scope.requestParam.endDate = item.dateRange.endDate;
                    }
                }
            };

            self.generateDateWiseReport = function () {
                switch ($scope.reportType) {
                    case 'posting-summary':
                        self.propertyPerformanceReport();
                        break;
                    case 'daily-activity':                       
                        self.dailyActivityReport();
                        break;
                    case 'postings':
                        self.postingsReport();
                        break;
                    case 'posting-titles':
                        self.postingTitlesReport();
                        break;
                    case 'posting-descriptions':                        
                        self.postingDescriptionsReport();
                        break;
                    case 'posting-times':
                        self.postingTimesReport();
                        break;
                    default:
                        self.propertyPerformanceReport();
                        break;
                }
            };           

            /**
         * Property Summary report REST API call & UI Grid population.
         */
            self.propertyPerformanceReport = function () {
                $scope.model.reportName = 'Property Results';

                $scope.gridOptions.columnDefs = [
                    { name: 'Property', field: 'property_name', width: 110, cellTemplate: '<div class="ui-grid-cell-contents">{{row.entity.property_name}}</div>' },
                    { name: 'State', field: 'state_name', width: 80, cellTemplate: '<div class="ui-grid-cell-contents">{{row.entity.state_name}}</div>' },
                    { name: 'City', field: 'city_name', width: 80, cellTemplate: '<div class="ui-grid-cell-contents">{{row.entity.city_name}}</div>' },
                    { name: 'Posts', field: 'started_posts' },
                    { name: 'Verified Posts', field: 'posts' },
                    { name: 'Leads', field: 'leads' },
                    { name: 'Leads/Post', field: 'leads_per_post' },
                    { name: 'Clicks', field: 'clicks' },
                    { name: 'Clicks/Post', field: 'clicks_per_post' }
                ];

                classifiedReportsService.getPropertySummaryReport($scope.requestParam)
                    .then(function (response) {                   
                        $scope.gridOptions.data = response;
                    },function () {
                        $scope.requestError = true;
                    });
            };            

            $scope.noGrps = function () {
                if (!$scope.groups || $scope.groups.length === 0) {
                    $scope.noGroupsMessage = 'The user is not assigned to any group.';
                }

            };

            self.populateDailyActivityReportData = function (response) {
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

                $scope.gridOptions.data = dailyActivityData;
            };

            self.dailyActivityReport = function () {
                $scope.chartEnabled = false;
                $scope.gridOptions.rowHeight = 29;
                $scope.headerClass = 'headingB';
                $scope.gridOptions.enableSorting = false;
                $scope.model.reportName = 'Daily Activity';

                $scope.gridOptions.columnDefs = [
                    { name: 'Date', field: 'date', cellTemplate: '<div class="ui-grid-cell-contents" ng-if="row.entity.date">{{row.entity.date | date: "EEE, MM/dd/yy"}}</div>' },
                    { name: 'Posts', field: 'noOfPostings' },
                    { name: 'Verified Posts', field: 'noVerifiedPosts' },
                    {
                        name: 'Leads',
                        field: 'noOfLeads',
                        cellTemplate: '<div class="ui-grid-cell-contents"><span  ng-if="row.entity.noOfLeads==0">{{row.entity.noOfLeads}}</span>' +
                        '<span ng-if="row.entity.noOfLeads>0" ><a target="_self" href="/leadsreport/allleads?lcid=1&pkey={{grid.appScope.propertyKey}}&selectedLeadTypeId=-1&fromDate={{grid.appScope.requestParam.startDate}}&toDate={{grid.appScope.requestParam.endDate}}">' +
                        '{{row.entity.noOfLeads}}</a></span></div>'
                    },
                    { name: 'Clicks', field: 'noOfClicks' }
                ];

                classifiedReportsService.getDailyActivityReport($scope.requestParam)
                    .then(function (response) {
                        if (response) {
                            self.populateDailyActivityReportData(response);

                            var dailyReportData = [];

                            if (response.length > $scope.MAX_DATA_POINTS) {
                                dailyReportData = response.slice(0, $scope.MAX_DATA_POINTS);
                            } else {
                                dailyReportData = response;
                            }

                            if (dailyReportData.length > 0) {
                                var chartImgUrl = mcClassifiedReportChartUtil.generateGraph(dailyReportData.reverse());
                                $scope.chartEnabled = true;
                                document.getElementById('dailyGraph').innerHTML = '"<img src="' + chartImgUrl + '" />';
                            } else {
                                document.getElementById('dailyGraph').innerHTML = '';
                            }
                        }
                    },function () {
                        $scope.requestError = true;
                    });
            };

            self.postingsReport = function () {
                $scope.model.reportName = 'Postings';
                var statusTemplate = '<div class="ui-grid-cell-contents">' +
                    '<span style="align-content: center" title="{{grid.appScope.getStatus(row.entity.state,\'\');grid.appScope.postingsStatus.message}}">' +
                    '<span class="{{grid.appScope.postingsStatus.status}}-status" ><em>{{grid.appScope.postingsStatus.status}}</em></span>' +
                    '</span></div>';

                $scope.gridOptions.columnDefs = [
                    {
                        name: 'Posted',
                        field: 'date',
                        width: 100,
                        cellTemplate: '<div class="ui-grid-cell-contents">{{grid.appScope.formatDateF(row.entity.date,row.entity.utc_time,\'MM/dd/yy hh:mm a\')}}</span></div>'
                    },
                    { name: 'Posted Date', field: 'date', visible: false },
                    { name: 'Day of Week', field: 'date', visible: false },
                    { name: 'Time of Day', field: 'date', visible: false },
                    { name: 'Time period/Interval', field: 'part_of_the_day', visible: false },
                    {
                        name: 'Status', field: 'state', width: 60, cellTemplate: statusTemplate
                    },
                    { name: 'Property Name', field: 'property_name', width: 150, cellTemplate: '<div class="ngCellText">{{row.entity.property_name}}</div>' },
                    {
                        name: 'Posting Title',
                        field: 'posting_title',
                        width: 400,
                        enableSorting: false,
                        cellTemplate: '<div class="ngCellText" title="{{grid.appScope.getPostingTooltip(row);}}"><span ng-cell-text>{{row.entity.posting_title}}</span></div>'
                    },
                    { name: 'Layout', field: 'layout_name', width: 120 },
                    { name: 'Floor plan', field: 'floorplan_name', width: 100, cellTemplate: '<div class="ui-grid-cell-contents">{{row.entity.floorplan_name}}</div>' },
                    {
                        name: 'Clicks',
                        field: 'clicks',
                        width: 50,
                        cellTemplate: '<div class="ui-grid-cell-contents"><div ng-if="row.entity.clicks>0"><a target="_self" href="/classified/report/posting-summary?pkey={{row.entity.property_key}}">{{row.entity.clicks}}</a></div><div ng-if="row.entity.clicks==0">{{row.entity.clicks}}</div></div>'
                    },
                    {
                        name: 'Tracked Leads',
                        field: 'leads',
                        width: 100,
                        cellTemplate: '<div class="ui-grid-cell-contents"><div ng-if="row.entity.leads>0"><a target="_self" ng-href="/leadsreport/allleads?lcid=1&pkey={{row.entity.property_key}}&selectedLeadTypeId=-1&fromDate={{grid.appScope.requestParam.startDate}}&toDate={{grid.appScope.requestParam.endDate}}">{{row.entity.leads}}</a></div><div <div ng-if="row.entity.leads==0">{{row.entity.leads}}</div></div>'
                    },
                    {
                        name: '', field: 'clicks', cellTemplate: '<div class="ui-grid-cell-contents">' +
                        '<span ng-show="grid.appScope.permManageList" title="Preview">' +
                        '<a ng-click= grid.appScope.openPreviewModal(row) class="preview-icon"><span><em>preview</em></span></a>' +
                        '</span>' +
                        '<span ng-show="grid.appScope.permManageList" title="Add Similar Listing">' +
                        '<a target="_self" ng-href="/classified/{{row.entity.property_key}}/listing/copy/{{row.entity.property_listing_id}}" class="similar-icon ">' +
                        '<span><em>add similar</em></span>' +
                        '</a>' +
                        '</span></div>'
                    }
                ];

                classifiedReportsService.getPostingsReport($scope.requestParam)
                    .then(function (response) {
                        $scope.gridOptions.data = response;
                    },function (err) {
                        $scope.requestError = true;
                    });
            };

            self.postingTitlesReport = function () {
                $scope.model.reportName = 'Post Titles';
                $scope.gridOptions.columnDefs = [
                    { name: 'Posting Title', field: 'posting_title_name', width: 500 },
                    { name: 'Posts', field: 'no_of_posts' },
                    { name: 'Tracked Leads', field: 'no_of_leads' },
                    {
                        name: 'Tracked Leads/Post',
                        field: 'leads_per_post',
                        cellTemplate: '<div class="ui-grid-cell-contents">{{row.entity.leads_per_post | number:2}}</div>'
                    },
                    { name: 'Clicks', field: 'no_of_clicks' },
                    {
                        name: 'Clicks/Post',
                        field: 'clicks_per_post',
                        cellTemplate: '<div class="ui-grid-cell-contents">{{row.entity.clicks_per_post | number:2}}</div>'
                    }
                ];

                classifiedReportsService.getPostingTitlesReport($scope.requestParam)
                    .then(function (response) {
                        $scope.gridOptions.data = response;
                    },function () {
                        $scope.requestError = true;
                    });
            };

            /**
             * Posting Descriptions Report and UI Grid population.
             */
            self.postingDescriptionsReport = function () {
                $scope.model.reportName = 'Posting Description';
                $scope.gridOptions.rowHeight = 35;//default

                var postDescTemplate = '<div class="ui-grid-cell-contents"><div class="postDesc" ng-if="row.entity.posting_description"><a title="{{row.entity.posting_description_name}}">{{row.entity.posting_description}}</a></div>' +
                    '<div  class="postDesc" ng-if="!row.entity.posting_description"><a title="Property Description">Default</a></div></div>';

                var fTemplate = '<div class="ui-grid-cell-contents" ng-if="row.entity.floorplan_name">{{row.entity.floorplan_name}}</div>' +
                    '<div class="ui-grid-cell-contents" ng-if="!row.entity.floorplan_name">Property</div>';

                $scope.gridOptions.columnDefs = [
                    {
                        name: 'Posting Description Name',
                        field: 'posting_description',
                        width: 250,
                        cellTemplate: postDescTemplate
                    },
                    { name: 'Posting Description', field: 'posting_description_name', width: 150, visible: false },
                    { name: 'Description Type', field: 'floorplan_name', cellTemplate: fTemplate },
                    { name: 'Property Name', field: 'property_name', cellTemplate: '<div class="ui-grid-cell-contents">{{row.entity.property_name}}</div> ' },
                    { name: 'Posts', field: 'no_of_posts', width: 70 },
                    { name: 'Tracked Leads', field: 'no_of_leads' },
                    { name: 'Tracked Leads/Post', field: 'leads_per_post' },
                    { name: 'Clicks', field: 'no_of_clicks' },
                    { name: 'Clicks/Post', field: 'clicks_per_post' }
                ];

                classifiedReportsService.getPostingDescriptionsReport($scope.requestParam)
                    .then(function (response) {
                        $scope.gridOptions.data = response;
                    },function () {
                        $scope.requestError = true;
                    });
            };

            /**
             * PostingTimes report REST api call & UI grid population.
             */
            self.postingTimesReport = function () {
                $scope.model.reportName = 'Posting Times';

                classifiedReportsService.getPostingTimesReport($scope.requestParam)
                    .then(function (response) {
                        $scope.gridOptions.data = response;
                    },function () {
                        $scope.requestError = true;
                    });
            };
        };

        classifiedReportsController.$inject = ['$rootScope','$scope',
                                                '$stateParams', '$location',
                                                '$filter', '$cookies',
                                                'mc.constants.controllerConstants',
                                                'mc.services.classifiedReportsService',
                                                'mc.utilites.dateTimeUtils',
                                                'mc.services.mcClassifiedReportChartUtil'];

        return classifiedReportsController;
    });

function hideLoader() {
    //jQuery(".busy-indicator").hide();
    //jQuery(".modal").removeClass('modal-start');
    //jQuery(".modal").addClass('modal-end');
    ////$(".modal-dialog").addClass('modal-enlarge');
    //jQuery('#popupModal').contents().find('#cboxClose').css("display", "none");
    //jQuery('#popupModal').contents().find('body').css("background-color", "#fff");
}





