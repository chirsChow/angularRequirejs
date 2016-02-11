'use strict';

define(['angular'],
    function (angular) {
        var myUiGridResize = function (gridUtil, uiGridConstants) {
            return {
                restrict: 'A',
                require: 'uiGrid',
                link: function ($scope, $elm, $attrs, uiGridCtrl) {                    
                    $scope.$watchGroup([$attrs.uiGrid + '.minRowsToShow', $attrs.uiGrid + '.paginationPageSize', $attrs.uiGrid + '.data'], function (val) {
                        var grid = uiGridCtrl.grid;

                        // Initialize scrollbars (TODO: move to controller??)
                        uiGridCtrl.scrollbars = [];
                        var rows = 0;
                        if (grid.options.paginationPageSize !== 30) {//Fitting the data only to page size else to min rows from the controller
                            rows = Math.min(grid.options.paginationPageSize, grid.options.data.length) + 1;
                        }
                        else {
                            rows = grid.options.minRowsToShow;
                        }



                        // Figure out the new height
                        var contentHeight = rows * grid.options.rowHeight;
                        var headerHeight = grid.options.hideHeader ? 0 : grid.options.headerRowHeight;
                        var footerHeight = grid.options.showFooter ? grid.options.footerRowHeight : 3;
                        var columnFooterHeight = grid.options.showColumnFooter ? grid.options.columnFooterHeight : 0;
                        var scrollbarHeight = grid.options.enableScrollbars ? gridUtil.getScrollbarWidth() : 0;
                        /* var pagerChldheight=0;
                         var children=$elm.children(".ui-grid-pager-panel");
                         $elm.children(".ui-grid-pager-panel").each(function(){
                         pagerChldheight=pagerChldheight+$(this).height();
                         });*/

                        var pagerHeight = 0;//grid.options.enablePagination ? gridUtil.elementHeight($elm.children(".ui-grid-pager-panel").height('')) : 0;
                        var maxNumberOfFilters = 0;
                        // Calculates the maximum number of filters in the columns
                        angular.forEach(grid.options.columnDefs, function (col) {
                            if (col.hasOwnProperty('filter')) {
                                if (maxNumberOfFilters < 1) {
                                    maxNumberOfFilters = 1;
                                }
                            }
                            else if (col.hasOwnProperty('filters')) {
                                if (maxNumberOfFilters < col.filters.length) {
                                    maxNumberOfFilters = col.filters.length;
                                }
                            }
                        });
                        var filterHeight = maxNumberOfFilters * headerHeight;

                        var newHeight = headerHeight + contentHeight + footerHeight + columnFooterHeight + scrollbarHeight + filterHeight + pagerHeight;


                        $elm.css('height', newHeight + 'px');

                        grid.gridHeight = $scope.gridHeight = gridUtil.elementHeight($elm);

                        // Run initial canvas refresh
                        grid.refreshCanvas();
                    });
                }
            };

        };

        return myUiGridResize;
    });