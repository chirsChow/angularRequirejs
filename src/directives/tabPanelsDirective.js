'use strict';

define(['angular'],
    function (angular) {
        var mcTabs = function () {
            return {                
                restrict: 'AE',
                scope:{
                    tabs: '=',
                    activeTab : '@'
                },
                template: '<div class="grid_24 reportsTab">' +
                              '<ul class="tab-bar horizontal clearfix">' + 
                                   '<li ng-repeat="tab in tabs" id="tab_{{tab.index}}" class="tab property-desc-tab"  ng-class="{ \'active\': tab.isActive , \'idle\': !tab.isActive}">' +
                                        '<a href="{{tab.url}}">{{tab.title}}</a>' +
                                        '<span class="rounded-corner nw"><em>&amp;160;</em></span>' +
                                        '<span class="rounded-corner ne"><em>&amp;160;</em></span>' +
                                   '</li>' +
                                '</ul>'+
                            '</div>',
                controller: [ '$scope', '$location', function ($scope, $location) {
                    var url = $location.url();
                    $scope.activeTab = {};

                    $scope.setActiveTab = function () {
                        var selectedTab = _.filter($scope.tabs, function (item) {
                            return item.url === url;
                        });

                        if (selectedTab && selectedTab.length > 0) {                           
                            selectedTab[0].isActive = true;
                            $scope.$parent.activeTab = selectedTab[0];
                        } else {
                            $scope.tabs[0].isActive = true;
                            $scope.$parent.activeTab = $scope.tabs[0];
                        }
                    };
                   
                }],
                link: function (scope, elem, attrs, ctrl, ngModel) {
                    var tabIndex = 1;

                    _.each(scope.tabs, function (item) {
                        item.index = tabIndex;
                        item.isActive = false;

                        var reportArr = item.url.split('/');
                        var report = reportArr[reportArr.length - 1];

                        item.reportType = report;
                        tabIndex++;
                    });

                    scope.setActiveTab();
                }
            };
        };

        return mcTabs;
    });