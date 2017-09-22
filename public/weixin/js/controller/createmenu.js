/**
 * Created by Administrator on 2017/9/19.
 */
(function(angular){
    'use strict';
    angular.module('weixinApp').controller('createmenuCtrl',
        ['$scope', '$rootScope', '$http', '$window',
            function($scope, $rootScope, $http, $window){

                var tmpkey = [];
                $scope.menu_num = 0;
                $scope.menu_add = 0;
                $scope.opts = [{type:"click",value:"key"},{type:"view",value:"url"}];
                $scope.select2 = {type:"click",value:"key"};
                $scope.select3 = {type:"click",value:"key"};
                $scope.addtag = false;
                $scope.seltag = false;
                function init(){
                    $http.get('/wxapi/menu_list').then(function successFn(response) {
                        var data = JSON.stringify(response.data);
                        $scope.keys = response.data.menu.button;
                        console.log("data : " + data);
                    }, function errorFn(response) {
                        console.log("err res : " + response);
                    });
                }
                $scope.selchild = function(num,val){
                    var i = parseInt(num);
                    var j = parseInt(val);
                    $scope.menu_num = i*10 + j+1;
                    $scope.name = $scope.keys[i].sub_button[j].name;
                    if($scope.keys[i].sub_button[j].type === "click"){
                        $scope.select3 = {type:"click",value:"key"};
                        $scope.zhi = $scope.keys[i].sub_button[j].key;
                    } else if($scope.keys[i].sub_button[j].type === "view"){
                        $scope.select3 = {type:"view",value:"url"};
                        $scope.zhi = $scope.keys[i].sub_button[j].url;
                    }
                    $scope.seltag = true;

                };
                $scope.add = function(){
                    $scope.menu_add = 1;
                    $scope.addtag = true;
                };
                $scope.createmenu = function(){

                    $http.post('/wxapi/menu_create',{key:{button:$scope.keys}}).then(function successFn(data) {
                        console.log("data : " + JSON.stringify(data));
                    }, function errorFn() {
                        console.log("errorFn()");
                    });
                };
                $scope.save = function(){
                    if(!$scope.select2.type)
                        return alert("select2 is no data");
                    if($scope.menu_add%10 === 2){
                        var num = parseInt($scope.menu_add/10);
                            if($scope.select2.type === "click")
                            $scope.keys[num].sub_button.push({type:"click",name:$scope.name,key:$scope.zhi});
                        else if($scope.select2.type === "view")
                            $scope.keys[num].sub_button.push({type:"view",name:$scope.name,url:$scope.zhi});
                    }else{
                        var obj = {};
                        obj.name = $scope.name;
                        console.log("name : " + $scope.name);
                        obj.sub_button = [];
                        obj.type = $scope.select2.type;
                        if($scope.select2.type === "click")
                            obj.key = $scope.zhi;
                        else if($scope.select2.type === "view")
                            obj.url = $scope.zhi;
                        $scope.keys.push(obj);
                    }

                    $scope.menu_add = 0;
                    $scope.addtag = false;
                };
                $scope.sel = function(num){
                    var i = parseInt(num);
                    console.log("i : " + i);
                    $scope.menu_num = i*10;
                    $scope.name = $scope.keys[i].name;
                    $scope.seltag = true;
                };
                $scope.deletemenu = function(num){
                    if(num%10 === 0){
                        var tmp = [];
                        var inum = num/10;
                        $scope.keys.forEach(function(item,index){
                            if (index === inum){
                                return ;
                            }
                            console.log("item : " + JSON.stringify(item));
                            tmp.push(item);
                        });
                        $scope.keys = tmp;
                        $scope.menu_num = 0;
                        $scope.seltag = false;
                    }else {
                        tmpkey = [];
                        var inum = parseInt(num/10);
                        var jnum = num%10 - 1;
                        console.log("inum : " + inum + " jnum : " + jnum);
                        if (jnum === 0){
                            $scope.keys.forEach(function(item,index){
                                if (index === inum){
                                    return ;
                                }
                                console.log("item : " + JSON.stringify(item));
                                tmpkey.push(item);
                            });
                            $scope.keys = tmpkey;
                            $scope.menu_num = 0;
                            $scope.seltag = false;
                            return;
                        }
                        console.log("sub_button.length : " + $scope.keys[inum].sub_button.length);
                        $scope.keys[inum].sub_button.forEach(function(item,index){
                            if(jnum === index)
                                return ;
                            tmpkey.push(item);
                        });
                        $scope.keys[inum].sub_button = tmpkey;
                        console.log(" inum : " + inum + "keys : " + JSON.stringify($scope.keys[inum]));
                        $scope.menu_num = 0;
                        $scope.addtag = false;
                    }
                };
                $scope.revert = function(){
                    $scope.addtag = false;
                    $scope.seltag = false;
                };
                $scope.addchild =function(num){
                    var inum = parseInt(num);
                    if($scope.keys[inum].sub_button.length >= 5)
                        return alert("至多有5个子菜单");
                    $scope.menu_add = inum*10 + 2;
                    $scope.addtag = true;
                };
                $scope.revisemenu = function(snum){
                    console.log("select3 : " + JSON.stringify($scope.select3));
                    if(!$scope.select3.type)
                        return alert("select3 is no data");
                    var num = parseInt(snum);
                    var inum = parseInt(num/10);
                    if(num%10){
                        if($scope.select3.type === "click")
                            $scope.keys[inum].sub_button[(num%10)-1] = {type:"click",name:$scope.name,key:$scope.zhi};
                        else if($scope.select3.type === "view")
                            $scope.keys[inum].sub_button[(num%10)-1] = {type:"view",name:$scope.name,url:$scope.zhi};
                        console.log("{} : " + JSON.stringify({type:$scope.select3.type,name:$scope.name,url:$scope.zhi}));
                        console.log("inum : " + inum + "num%10 - 1 : " + ((num%10)-1) + "info : " + JSON.stringify($scope.keys[inum].sub_button[(num%10)-1]));
                    }else{
                        $scope.keys[inum].name = $scope.name;
                        $scope.keys[inum].type = $scope.select3.value;
                        if($scope.select3.value === "click")
                            $scope.keys[inum].key = $scope.zhi;
                        else if($scope.select3.value === "view")
                            $scope.keys[inum].url = $scope.zhi;
                    }
                    $scope.zhi = "";
                    $scope.name = "";
                    $scope.seltag = false;
                };
                init();
            }]);
})(angular);