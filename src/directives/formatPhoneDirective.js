'use strict';

define(['angular'],
    function (angular) {
        var formatPhone = function () {
            return {
                require: 'ngModel',
                restrict: 'A',
                link: function (scope, elem, attrs, ctrl, ngModel) {
                    elem.add('#phonenumber').on('keyup', function () {
                        var origVal = elem.val().replace(/[^\w\s]/gi, '');
                        var number = origVal;
                        this.value = '(' + number.substring(0, 3) + ')-' + number.substring(3, 6) + '-' + number.substring(6, 10);
                    });
                }
            };
        };

        return formatPhone;
    });