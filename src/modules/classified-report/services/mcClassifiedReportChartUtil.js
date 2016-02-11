/**
 * Created by RVankayala on 12/24/2015.
 */
'use strict';

define(['angular'],
    function (angular) {
        var mcClassifiedReportChartUtil = function($filter) {

            var DATE_FORMAT = 'MM/dd';
            var LAST_N_DAYS = 0;
            var GOOGLE_MIMIMUM_AXIS_VALUE = 4;
            var Y1_AXIS_COLOR = 'E69403';    //Clicks
            var Y2_AXIS_COLOR = '61D5FA';    //Leads
            var X_AXIS_COLOR = '808080';
            var BACKGROUND_COLOR = 'F4F7F7';
            var SEPERATOR = '|';
            var COMMA = ',';
            var URL = 'http://chart.apis.google.com/chart?chid=';

            function getAxisRange(clickCountMaxValue, leadCountMaxValue) {
                var axisRange = '';
                axisRange = axisRange.concat('0,0,').concat(LAST_N_DAYS).concat(SEPERATOR);       //X-axis
                axisRange = axisRange.concat('1,0,').concat(clickCountMaxValue).concat(SEPERATOR); // Y-axis
                axisRange = axisRange.concat('2,0,').concat(leadCountMaxValue);                   // R-axis
                return axisRange;

            }
            function getTypeMaxValue(type, collection) {
                var maxValue = 0;
                angular.forEach(collection, function(dailyActivityReport, key) {
                    if(dailyActivityReport[type] > maxValue) {
                        maxValue = dailyActivityReport[type];
                    }
                });
                if (maxValue <= 3) {
                    maxValue = GOOGLE_MIMIMUM_AXIS_VALUE;
                }
                return maxValue;
            }

            function getPermittedValuesForDataSeries(data) {
                var permittedValuesForSeries = '';
                permittedValuesForSeries = permittedValuesForSeries.concat('0,').concat(LAST_N_DAYS - 1);
                permittedValuesForSeries = permittedValuesForSeries.concat(COMMA).concat(0);
                permittedValuesForSeries = permittedValuesForSeries.concat(COMMA).concat(getTypeMaxValue('no_of_clicks', data));
                permittedValuesForSeries = permittedValuesForSeries.concat(',0,').concat(LAST_N_DAYS - 1);
                permittedValuesForSeries = permittedValuesForSeries.concat(COMMA).concat(0);
                permittedValuesForSeries = permittedValuesForSeries.concat(COMMA).concat(getTypeMaxValue('no_of_leads', data));

                return permittedValuesForSeries;

            }
            function getAxisLabels(collection)
            {
                var label = '';
                angular.forEach(collection, function(dailyActivityReport, key) {
                    var actDate = dailyActivityReport.date;
                    var dtArr = actDate.split(' ');
                    var tempDate = new Date(dtArr[0]);
                    label = label + SEPERATOR + $filter('date')(tempDate, DATE_FORMAT);
                });
                return label;
            }

            function convertReportToDataPoints(collection) {

                var lineXAxis = '' ;
                var line1YAxis = '';
                var line2YAxis = '';
                var finalString = 't:';
                var i = 0;
                var separator = '|';
                angular.forEach(collection, function(dailyActivityReport, key) {
                    lineXAxis = lineXAxis + i + COMMA;
                    line1YAxis = line1YAxis + dailyActivityReport.no_of_clicks + COMMA;         //Clicks
                    line2YAxis = line2YAxis + dailyActivityReport.no_of_leads + COMMA;           //Leads
                    i++;
                });
                lineXAxis = lineXAxis.substring(0, lineXAxis.length - 1);
                line1YAxis = line1YAxis.substring(0, line1YAxis.length - 1);
                line2YAxis = line2YAxis.substring(0, line2YAxis.length - 1);
                finalString = finalString + lineXAxis + separator + line1YAxis + separator + lineXAxis + separator + line2YAxis;
                return finalString;

            }
            function contrstuctUrlForSinglePt()
            {
                var conUrl = '';
                conUrl = conUrl.concat('&chm=s,').concat(Y1_AXIS_COLOR).concat(',0,-1,4').concat(SEPERATOR).concat('s,').concat(Y2_AXIS_COLOR).concat(',1,-1,4');
                return conUrl;
            }
            function constructUrlForChart(dataPoints, axisLabel, permittedValuesForSeries, axisRange) {
                var ampersand = '&';

                URL = 'http://chart.apis.google.com/chart?chid=';
                URL = URL.concat(new Date().getTime());
                URL = URL.concat(ampersand).concat('chxl=0:').concat(axisLabel);
                URL = URL.concat(ampersand).concat('chxr=').concat(axisRange); // Range for X-axis
                URL = URL.concat(ampersand).concat('chxs=0,').concat(X_AXIS_COLOR).concat(',10,0,lt,').concat(X_AXIS_COLOR).concat('|1,').concat(Y1_AXIS_COLOR).concat(',10,0,lt,').concat(Y1_AXIS_COLOR);  // Axis styles
                URL = URL.concat('|2,').concat(Y2_AXIS_COLOR).concat(',10,0,lt,').concat(Y2_AXIS_COLOR);
                URL = URL.concat(ampersand).concat('chxtc=0,7'); // tickmark size
                URL = URL.concat(ampersand).concat('chxt=x,y,r'); // define axis as x,y,r
                URL = URL.concat(ampersand).concat('chs=900x225');   //Chart size
                URL = URL.concat(ampersand).concat('cht=lxy'); // Chart type
                URL = URL.concat(ampersand).concat('chco=').concat(Y1_AXIS_COLOR).concat(',').concat(Y2_AXIS_COLOR);  // Series  Colors
                URL = URL.concat(ampersand).concat('chd=').concat(dataPoints);  // data points
                URL = URL.concat(ampersand).concat('chls=2|2'); // Line styles
                URL = URL.concat(ampersand).concat('chds=').concat(permittedValuesForSeries); // Permitted values for series
                URL = URL.concat(ampersand).concat('chma=40,40,10,10');
                URL = URL.concat(ampersand).concat('chf=bg,s,').concat(BACKGROUND_COLOR);
                return URL;
            }

            return {

                generateGraph: function (collection) {
                    var url = '';
                    LAST_N_DAYS = collection.length;
                    var dataPoints = convertReportToDataPoints(collection);
                    var axisLabel = getAxisLabels(collection);
                    var clickCountMaxValue = getTypeMaxValue('no_of_clicks', collection);
                    var leadCountMaxValue = getTypeMaxValue('no_of_leads', collection);
                    var permittedValuesForSeries = getPermittedValuesForDataSeries(collection);
                    var axisRange = getAxisRange(clickCountMaxValue, leadCountMaxValue);
                    url = constructUrlForChart(dataPoints, axisLabel, permittedValuesForSeries, axisRange);
                    if (collection.length === 1) {
                        url = url + contrstuctUrlForSinglePt();
                    }

                    return url;
                }

            };
        };

        mcClassifiedReportChartUtil.$inject = ['$filter'];

        return mcClassifiedReportChartUtil;

    });