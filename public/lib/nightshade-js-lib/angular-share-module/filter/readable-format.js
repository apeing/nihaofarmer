// '1234567890'-> '1234 5678 90'
(function(angular){
    'use strict';
    angular.module('shareModule').filter('readableFormat', [function(){
        return function (content, partLength, split){
            split = split || ' ';
            partLength = partLength || 4;
            content = content || '';
            return content.replace(new RegExp('(.{' + partLength + '})', 'g'), '$1' + split);
        };
    }]);
})(angular);