'use strict';

define(['angular'],
    function (angular) {

        var dateTimeUtils = function ($filter) {
            var self = this;

            /**
            * Parse date input parameter.
            * @param input
            * @param utc
            * @returns {Date}
            */
            self.parseDatetime = function (input, utc) {
                if (!input) { return; }

                var match = input.match(/(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/);
                match.shift(); // discard the "full match" index
                match[1]--;
                var lIndex = utc.toString().indexOf('.') === -1 ? 1 : utc.toString().indexOf('.');
                var hrs = utc.toString().substr(1, lIndex);
                var min = utc.toString().indexOf('.') !== -1 ? utc.toString().substr(utc.toString().indexOf('.') + 1) : 0;

                if (utc.toString().charAt(0) === '-') {
                    match[3] = match[3] - parseInt(hrs);
                    match[4] = match[4] - parseInt(min);
                } else if (utc.toString().charAt(0) === '+') {
                    match[3] = match[3] + parseInt(hrs);
                    match[4] = match[4] + parseInt(min);
                }
                var newDate = new Date(match[0], match[1], match[2], match[3], match[4], match[5], 0);
                return newDate;
            };

            /**
            * Date Format
            * @param date
            * @returns {*}
            */
            self.formatDate = function (date) {
                return $filter('date')(date, 'MM/dd/yyyy');
            };

            /**
            * Date helper function
            * @param str
            * @param utc
            * @param format
            * @returns {*}
            */
            self.formatDateF = function (str, utc, format) {
                var dat = self.parseDatetime(str, utc);
                var lastWeek = $filter('date')(dat, format);
                return lastWeek;
            };

            /**
            * Calculate previouse based on given number of days.
            * @param days
            * @returns {Date}
            */
            self.calculatePrvDate = function (days) {
                var last = new Date(new Date().getTime() - (days * 24 * 60 * 60 * 1000));
                return last;
            };
        };

        dateTimeUtils.$inject = ['$filter'];

        return dateTimeUtils;
    });
