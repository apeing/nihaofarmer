/**
 * Created by Administrator on 2017/9/19.
 */
var app = angular.module('weixinApp', ['ui.router']);
//配置路由，
app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    $stateProvider.state('index', {
        //url+#/index
        url: '/index',
        templateUrl: 'template/index.html',
        controller: 'indexCtrl'
    }).state('index.createmenu', {
        //url+#/index
        url: '/createmenu',
        templateUrl: 'template/createmenu.html',
        controller: 'createmenuCtrl'
    });
    $urlRouterProvider.when('', '/index');
}])
//设置api的路径
app.value('apiUrl','http://localhost/newsapi/data');
//app.value('apiUrl','http://localhost:12345/news/dist/js/test.json');
//设置api请求的方法，发布时候用jsonp，get只是请求用来请求测试的json文件～
app.value('apiMethod','get');
//测试数据
//var news = json;
//console.log(news);
