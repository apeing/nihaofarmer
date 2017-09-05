//尽管angularjs提供了诸如$location.search以及$routeParams的方式获取查询参数的值，但是这两种方式都有相同的局限性，
//当查询参数出现在哈希部分之前时，这两种方式均失败，即当链接为www.tomatotown.com/index.html?a=b#/detail/23时，无法拿到查询参数
(function (angular){
    'use strict';
    angular.module('shareModule').factory('queryParameterService', ['$window', function($window) {
        return {
            getQueryParamByName: function(name){
                name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
                var regex = new RegExp('[\\?&]' + name + '=([^&#]*)'),
                    results = regex.exec($window.location.search);
                return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
            }
        };
    }]);
})(angular);
