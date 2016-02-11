'use strict';

define(['angular'],
    function (angular) {
        var filterByRegion = function (data, filterName, filterVal, fieldName) {
            var matches = [];

            //loop through data items and visible fields searching for match
            for (var i = 0; i < data.length; i++) {

                var dataItem = data[i];
                // var fieldName = 'property_id';

                if (dataItem[filterName] === filterVal) {
                    if (fieldName && fieldName !== '') {
                        matches.push(dataItem[fieldName]);
                    }
                    else {
                        matches.push(dataItem);
                    }
                }
            }
            return matches;
        };

        return filterByRegion;
    });