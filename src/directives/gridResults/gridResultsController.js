'use strict';

define(['angular'],
    function (angular) {
        var gridResultsController = function ($scope, dateTimeUtils, $uibModal) {

            var self = this;

            $scope.rowHeight = 30;
            $scope.noDataMsg = '';

            //UI Grid configuration parameters
            $scope.export_row_type = 'all';
            $scope.export_column_type = 'all';

            // default grid behavior
            $scope.gridOptions = {
                data: [],
                columnDefs : [],
                enableSorting: true,
                onRegisterApi: function (gridApi) {
                    $scope.gridApi = gridApi;
                },
                exporterSuppressMenu: true,
                enableHorizontalScrollbar: false,
                enableVerticalScrollbar: false,
                paginationPageSizes: [15, 30, 60, 90],
                minRowsToShow: 31,
                paginationPageSize: 30,
                rowHeight: $scope.rowHeight,
                headerRowHeight: 38,
                enableGridMenu: true,
                enableSelectAll: false,
                exporterMenuAllData: false,
                exporterMenuVisibleData: false,
                exporterMenuSelectedData: false,
                exporterMenuPdf: false,
                exporterMenuCsv: false,
                exporterCsvFilename: $scope.reportName + '.csv',
                exporterPdfFilename: $scope.reportName + '.pdf',
                exporterPdfDefaultStyle: {fontSize: 8},
                exporterPdfTableStyle: {margin: [10, 10, 10, 10]},
                exporterPdfTableHeaderStyle: {fontSize: 8, bold: true, italics: false},
                exporterMenuLabel: 'Excel',
                exporterPdfHeader: {text: $scope.reportName, style: 'headerStyle'},
                exporterPdfFooter: function (currentPage, pageCount) {
                    return {text: currentPage.toString() + ' of ' + pageCount.toString(), style: 'footerStyle'};
                },
                exporterPdfCustomFormatter: function (docDefinition) {
                    docDefinition.styles.headerStyle = {fontSize: 22, bold: true};
                    docDefinition.styles.footerStyle = {fontSize: 10, bold: true};
                    return docDefinition;
                },
                exporterPdfOrientation: 'landscape',
                exporterPdfPageSize: 'LETTER',
                exporterPdfMaxGridWidth: 650,
                exporterCsvLinkElement: angular.element(document.querySelectorAll('.custom-csv-link-location')),
                enableColumnMenus: false,
                gridMenuShowHideColumns: false,
                exporterSuppressColumns: ['', 'Posted'],               
                gridMenuCustomItems: [{
                    icon: 'icon excel', title: '',
                    action: function ($event) {
                        var myElement = angular.element(document.querySelectorAll('.custom-csv-link-location'));
                        $scope.gridApi.exporter.csvExport($scope.export_row_type, $scope.export_column_type, myElement);
                    },
                    order: 99
                }, {
                    icon: 'icon pdf', title: '',
                    action: function ($event) {
                        $scope.gridApi.exporter.pdfExport($scope.export_row_type, $scope.export_column_type);
                    },
                    order: 99
                }],
                showColumnFooter: true,
                footerTemplate: '<div class="lineBottom"></div>'
            };          

            //Manage Listings Privilege
            $scope.permManageList = document.querySelector('#permMngListings') ? angular.element(document.querySelector('#permMngListings')).prop('value') : false;

            $scope.gridOptions.headerTemplate = '<div role="rowgroup" class="ui-grid-header"> ' +
                '<div class="ui-grid-top-panel">  <div class="ui-grid-header-viewport">  <div class="ui-grid-header-canvas">' +
                '<div class="ui-grid-header-cell-wrapper" ng-style="colContainer.headerCellWrapperStyle()">  <div role="row" class="ui-grid-header-cell-row">' +
                '<div class="ui-grid-header-cell ui-grid-clearfix heading" ng-repeat="col in colContainer.renderedColumns track by col.uid" ui-grid-header-cell col="col" render-index="$index" title="{{col.displayName}}"> </div> </div> </div> </div> </div> </div> </div>';


            $scope.gridOptions.exporterFieldCallback = function (grid, row, col, value) {
                if (col.name === 'Time of Day') {
                    if (value) {
                        value = dateTimeUtils.formatDateF(row.entity.date, row.entity.utc_time, 'hh:mm a');
                    }
                }
                if (col.name === 'Day of Week') {
                    if (value) {
                        value = dateTimeUtils.formatDateF(row.entity.date, row.entity.utc_time, 'EEEE');
                    }
                }
                if (col.name === 'Posted Date') {
                    if (value) {
                        value = dateTimeUtils.formatDateF(row.entity.date, row.entity.utc_time, 'EEE, MM/dd/yyyy');
                    }
                }
                if (col.name === 'Date') {
                    if (value) {
                        value = dateTimeUtils.formatDateF(row.entity.date, row.entity.utc_time, 'MM/dd/yyyy');
                    }
                }
                if (col.name === 'Status') {
                    if (value) {
                        var statO = $scope.getStatus(row.entity.state, '');
                        value = statO.status;
                    }
                }

                if (col.name === 'Posting Description Name') {
                    if (!value) {
                        value = 'Default';
                    }
                }
                if (col.name === 'Posting Description') {
                    if (!value) {
                        value = 'Property Description';
                    }
                }
                if (col.name === 'Description Type') {
                    if (!value) {
                        value = 'Property';
                    }
                }

                return value;
            };

            $scope.formatDateF = function (date, format) {
                return dateTimeUtils.formatDateF(date, format);
            };

            $scope.getStatus = function (id, str) {

                var statusObject = {},
                    status = '',
                    abbrev = '',
                    message = '';

                statusObject = {
                    status: status,
                    abbrev: abbrev,
                    message: ''
                };
                switch (id) {
                    case 1:
                        status = 'Unposted';
                        abbrev = 'UNPOS';
                        message = 'Unposted.';
                        break;
                    case 2:
                        status = 'Started';
                        abbrev = 'START';
                        message = 'Posting in progress. The Classified posting process has been started but has not been verified on your Classified tool.';
                        break;
                    case 3:
                        status = 'Pending';
                        abbrev = 'PEND';
                        message = 'The posting process has been completed. The system is validating its status on your Classified tool.';
                        break;
                    case 4:
                        status = 'Verified';
                        abbrev = 'UVER';
                        message = 'This posting went live on your Classified tool (user verified).';
                        break;
                    case 5:
                        status = 'Verified';
                        abbrev = 'LDVER';
                        message = 'This posting went live on your Classified tool (lead verified).';
                        break;
                    case 6:
                        status = 'Verified';
                        abbrev = 'CLVER';
                        message = 'This posting went live on your Classified tool (system verified).';
                        break;
                    case 7:
                        status = 'Unverified';
                        abbrev = 'GHOST';
                        message = 'This posting appears to be unverified on your Classified tool.';
                        break;
                    case 8:
                        status = 'Flagged';
                        abbrev = 'FLAG';
                        message = 'A Classified\'s user has flagged this posting.';
                        break;

                }

                statusObject.status = status;
                statusObject.abbrev = abbrev;
                statusObject.message = message;
                $scope.postingsStatus = statusObject;

                return statusObject;
            };

            $scope.getPostingTooltip = function (row) {
                var tooltip = 'Property Name:' + row.entity.property_name;

                if (row.entity.is_display) {
                    tooltip += ' Listing Name:' + row.entity.property_listing_name + ', Listing Id:' + row.entity.property_listing_id;
                }

                return tooltip;
            };

            $scope.export = function () {
                if ($scope.export_format === 'csv') {
                    var myElement = angular.element(document.querySelectorAll('.custom-csv-link-location'));
                    $scope.gridApi.exporter.csvExport($scope.export_row_type, $scope.export_column_type, myElement);
                } else if ($scope.export_format === 'pdf') {
                    $scope.gridApi.exporter.pdfExport($scope.export_row_type, $scope.export_column_type);
                }
            };

            $scope.openPreviewModal = function (row) {

                var url = '/classified/' + row.entity.property_key + '/listing/view/' + row.entity.property_listing_id;
                var modalInstanceCtrl = function ($scope, $uibModalInstance, url) {
                    $scope.url = url;
                    $scope.close = function () {
                        $uibModalInstance.dismiss();
                    };
                };

                var modalInstance = $uibModal.open({
                    //templateUrl: '../../angular/classified-report/scripts/template/previewModal.html',
                    template: '<div class="modal-body">' +
                    '<div class="modal-header"></div>' +
                    '<div class="modal-body">' +
                    '<button class="btnClose" ng-click="close()"></button>' +
                    '<div class="wait-indicator">' +
                    '<div id="rp-loader" class="loader">' +
                    '<img src="/images/common/loading.gif">' +
                    '</div>' +
                    '<div class="wait-indicator-message"><span>Please wait...</span></div>' +
                    '</div>' +
                    '<iframe id="popupModal" src="{{url}}" width="100%" height="100%"  onload="hideLoader()">' +
                    '</iframe>' +
                    '</div>' +
                    '<div class="modal-footer"></div>' +
                    '</div>',
                    controller: modalInstanceCtrl,
                    backdrop: 'static',
                    size: 'lg',
                    windowClass: 'modal-start',
                    resolve: {
                        url: function () {
                            return url;
                        }
                    }
                });              
            };
        };

        gridResultsController.$inject = ['$scope', 'mc.utilites.dateTimeUtils', '$uibModal'];

        return gridResultsController;
    });
