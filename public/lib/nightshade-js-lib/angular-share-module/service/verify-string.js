(function (angular){
    'use strict';
    angular.module('shareModule').factory('verifyStringService', function() {
        return {
            //字符串去前后空格
            stringTrim:function(str){
                return str ? str.trim() : str;
            },
            //验证字符串非空(空数组，空json，空fn，默认为非空)
            verifyEmpty:function(str){
                if(str === undefined || str === null)return true;
                if (typeof str === 'string' || str instanceof String){
                    return str.trim().length === 0;
                }
                return false;
            },
            // 验证是否是数字
            isNumber:function (n){
                return !isNaN(parseFloat(n)) && isFinite(n);
            },
            //验证是否是数组
            isArray:function (obj){
                return Object.prototype.toString.call(obj) === '[object Array]' ;
            }
        };
    });
})(angular);
