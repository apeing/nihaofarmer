(function (angular){
    'use strict';
    angular.module('shareModule').factory('busyIndicatorService', ['$rootScope', function($rootScope) {
        return {
            showBusyIndicator: function(){
                $rootScope.isBusy = true;
            },
            hideBusyIndicator: function(){
                $rootScope.isBusy = false;
            }
        };
    }]);
})(angular);
