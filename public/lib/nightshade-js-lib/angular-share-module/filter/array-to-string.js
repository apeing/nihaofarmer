(function(angular){
    'use strict';
    angular.module('shareModule').filter('arrayToString', [function(){
        return function (items, split, propertyName){
            if(propertyName){
                var stringItems = [];
                angular.forEach(items, function(item){
                    stringItems.push(item[propertyName]);
                });
                return stringItems.join(split);    
            }
            return items.join(split);
        };
    }]);
})(angular);