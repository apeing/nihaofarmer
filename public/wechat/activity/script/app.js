/**
 * Created by Administrator on 2017/8/10.
 */
(function(angular){
    'use strict';
    angular.module('activity',['ngRoute','ngCookies', 'LocalStorageModule','shareModule','ngFileUpload','angularQFileUpload'])
        .config(['$routeProvider','$compileProvider', 'localStorageServiceProvider', function ($routeProvider,$compileProvider, localStorageServiceProvider) {
            $routeProvider.when('/notice', {
                templateUrl: 'view/notice.html',
                controller: 'noticeController'
            }).when('/index', {
                templateUrl: 'view/index.html',
                controller: 'indexController'
            }).when('/register', {
                templateUrl: 'view/register.html',
                controller: 'RegisterController'
            }).when('/home', {
                templateUrl: 'view/home.html',
                controller: 'HomeController'
            }).otherwise({
                redirectTo: '/index'
            });
            localStorageServiceProvider.setStorageType('sessionStorage');
        }]).run(function() {
        console.log('run! ');
    });
})(angular);
