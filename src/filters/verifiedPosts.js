'use strict';

define(['angular'],
    function (angular) {
        var verifiedPosts = function () {
            return function (data, grid) {

                var matches = [];
                //debugger;

                //no filter defined so bail
                /* if (query === undefined|| query==='') {
                 return data;
                 }*/



                //loop through data items and visible fields searching for match
                for (var i = 0; i < data.length; i++) {
                    //for (var j = 0; j < grid.columnDefs.length; j++) {

                    var dataItem = data[i];
                    var fieldName = 'state';

                    //as soon as search term is found, add to match and move to next dataItem
                    if ((dataItem[fieldName] === 4 || dataItem[fieldName] === 5 || dataItem[fieldName] === 6)) {
                        matches.push(dataItem);
                    }
                    //}
                }

                return matches;
            };
        };

        return verifiedPosts;

    });