(function(angular){
    'use strict';
    angular.module('weixinApp').controller('indexCtrl',
        ['$scope', '$rootScope', '$http', '$window',
            function($scope, $rootScope, $http, $window){
                $scope.toggleTab1 = function(){
                    console.log("tab1");
                    $window.location.href = '#/index/createmenu';
                };
                $scope.toggleTab2 = function(){
                    console.log("tab2");
                };
            }]);
})(angular);