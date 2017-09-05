(function(angular){
    'use strict';
    angular.module('shareModule').filter('tomatoCurrency', ['$filter', function($filter){
        return function (amount, symbol, fractionSize){
            return $filter('currency')((amount / 100), symbol, fractionSize);
        };
    }]);
})(angular);