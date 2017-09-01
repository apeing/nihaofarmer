/**
 * Created by Administrator on 2017/8/18.
 */
(function(angular){
    'use strict';
    angular.module('activity').controller('HomeController',
        ['$scope', '$location', '$http', '$window','$cookies',
            function($scope, $location, $http, $window,$cookies){
                $scope.logout = function(){
                    $cookies.remove("mobile");
                    $location.path('/index').replace();
                }
                $scope.tro = function(){

                }
                function init(){
                    $window.document.title = 'home页面';
                    $scope.cook = $cookies.get('mobile');
                    $http.get('/wechat/user').then(function successFn(response) {
                        $scope.mobile = response && response.data && response.data.mobile;
                        console.log("mobile : " + $scope.mobile);
                    }, function errorFn(response) {
                        console.log('response err');
                        if (response.status === 401) return  $location.path('/index').replace();
                    });
                }

                init();
            }]);
})(angular);
