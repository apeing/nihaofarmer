(function(angular){
    'use strict';
    angular.module('activity').controller('indexController',
    ['$scope', '$location', '$http', '$cookies', '$window','confirmMessageService',
    function($scope, $location, $http, $cookies, $window,confirmMessageService){

        $scope.login = function(){
            if(!$scope.mobile)
                return confirmMessageService.addAlert({title:'',msg:'没有输入手机号',btnText:''});
            if(!$scope.password)
                return confirmMessageService.addAlert({title:'',msg:'没有输入密码',btnText:''});
            $http.post('/wechat/load',{'mobile': $scope.mobile, 'password':$scope.password}).then(function successFn() {
                $location.path('/home').replace();
            }, function errorFn() {
                confirmMessageService.addAlert({title:'',msg:'用户名或密码错误',btnText:''});
                $location.path('/index').replace();
            });
        };

        $scope.register = function(){
            $location.path('/register').replace();
        };

        function init(){
            $window.document.title = 'nihaofarmer主页';
        }
        init();
    }]);
})(angular);
