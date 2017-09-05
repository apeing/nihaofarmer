(function(angular){
    'use strict';
    angular.module('shareModule').filter('cityDisplayer', ['cities', function(cities){
        return function (cityCode){
            for (var i = 0; i < cities.length; i++) {
                if(cities[i].cityCode === cityCode){
                    return cities[i].name;
                }
            }
            return '';
        };
    }]);
})(angular);
