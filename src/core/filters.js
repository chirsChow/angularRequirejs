'use strict';

define(['angular',
    '../filters/datepicker',
    '../filters/tel',
    '../filters/unique',
    '../filters/verifiedPosts',
    '../filters/filterByRegion'
],

function (angular, datepicker, tel, unique, verifiedPosts, filterByRegion) {
    return angular.module('mc.core.filters', [])
    .filter('datepicker', datepicker)
    .filter('tel', tel)
    //.filter('filterByRegion', filterByRegion)
   // .filter('unique', unique)
    .filter('verifiedPosts', verifiedPosts);
});