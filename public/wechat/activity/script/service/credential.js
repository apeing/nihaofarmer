/**
 * Created by Administrator on 2017/8/22.
 */
(function(angular){
    'use strict';
    angular.module('activity').factory('credentialService',
        ['localStorageService', '$location',
            function(localStorageService, $location){
                return {
                    getCredential: function(successFn){
                        var cred = localStorageService.get('cred');
                        if(cred) {
                            var credential = JSON.parse(cred);
                            if(credential.id && credential.token) {
                                return successFn(credential);
                            }
                        }
                        localStorageService.set('path', $location.path());
                        return $location.path('/').replace();
                    }
                };
            }]);
})(angular);