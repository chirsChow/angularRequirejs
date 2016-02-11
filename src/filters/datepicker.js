'use strict';

define(['angular'],
    function (angular) {
        var datepicker = function () {
            return {
                restrict: 'A',
                require: 'ngModel',
                link: function (scope, elem, attrs, ngModelCtrl) {
                    var updateModel = function (dateText) {
                        scope.$apply(function () {
                            ngModelCtrl.$setViewValue(dateText);
                        });
                    };
                    var options = {
                        dateFormat: 'mm-dd-yy',
                        showOtherMonths: true, selectOtherMonths: true, minDate: '1d',
                        onSelect: function (dateText) {
                            updateModel(dateText);
                        }
                    };
                    elem.datepicker(options);
                }
            };
        };

        return datepicker;
    });