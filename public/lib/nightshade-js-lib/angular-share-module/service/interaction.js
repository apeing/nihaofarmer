(function(angular){
    'use strict';
    var shareModule = angular.module('shareModule');
    if(shareModule.requires.indexOf('LocalStorageModule') < 0)
        shareModule.requires.push('LocalStorageModule');
    shareModule.factory('interactionService', ['$q', '$window', 'localStorageService', '$location', function($q, $window, localStorageService, $location){
        return {
            getCredential: function(callback){
                if($window.sync && $window.sync.isHostInApp()){
                    if(!this.isSupport('getCurrentUser'))
                        return callback({});
                    return $window.sync.invoke('getCurrentUser', '', function(err, currentUser){
                        callback(currentUser);
                    });
                }
                var cred = localStorageService.get('cred');
                if(cred) {
                    var credential = JSON.parse(cred);
                    if(credential.id && credential.token) return callback(credential);
                }

                localStorageService.set('path', $location.path());
                return $location.path('/login');
            },
            goAlipay: function(payParams, callback){
                if(!this.isSupport('goAlipay'))
                    callback({result: 'failed', reason: 'not support'});
                $window.sync.invoke('goAlipay', payParams, function(err, payResult){
                    // if(err) throw err;
                    callback(payResult);
                });
            },
            leftMenuButtonClosed: function(){
                if(!this.isSupport('leftMenuButtonClosed'))
                    return;
                $window.sync.invoke('leftMenuButtonClosed', '', function(){
                });
            },
            setLeftMenuButtonTitle: function(title){
                if(!this.isSupport('setLeftMenuButtonTitle'))
                    return;
                $window.sync.invoke('setLeftMenuButtonTitle', title, function(){
                });
            },
            setCurrentLocation: function(location){
                if(!this.isSupport('setCurrentLocation'))
                    return;
                $window.sync.invoke('setCurrentLocation', location, function(){
                });
            },
            redirectToPage: function(url){
                if(!this.isSupport('redirectToPage'))
                    return;
                $window.sync.invoke('redirectToPage', url, function(){
                });
            },
            addObserver: function(key, eventName, callback){
                $window.sync.addObserver(eventName, key, callback);
            },
            removeObserver: function(eventName, key){
                $window.sync.removeObserver(key, eventName);
            },
            changeShareData: function(description, logo, title, link){
                $window.share.changeShareData(description, logo, title, link);
            },
            initShareDate: function(shareData){
                if($window.share) $window.share.initShareData(shareData.weChat.description, shareData.weChat.logo, shareData.weChat.title, shareData.weChat.link);
                if($window.sync) $window.sync.initShareData(
                    shareData.app.description, shareData.app.logo, shareData.app.title, shareData.app.link);
            },
            enableShare: function(){
                if(!this.isSupport('enableShare'))
                    return;
                $window.sync.invoke('enableShare', '', function(){
                });
            },
            disableShare: function(){
                if(!this.isSupport('disableShare'))
                    return;
                $window.sync.invoke('disableShare', '', function(){
                });
            },
            showMenuItems: function(menuItems){
                if(!this.isSupport('showMenuItems'))
                    return;
                $window.sync.invoke('showMenuItems', menuItems, function(){
                });
            },
            hideMenuItems: function(menuItems){
                if(!this.isSupport('hideMenuItems'))
                    return;
                $window.sync.invoke('hideMenuItems', menuItems, function(){
                });
            },
            logout: function(){
                if(!this.isSupport('logout'))
                    return;
                $window.sync.invoke('logout', '', function(){
                });
            },
            doWeChatPay: function(params, callback){
                if(!this.isSupport('goWXpay'))
                    return;
                if($window.sync.isHostInApp()) return $window.sync.invoke('goWXpay', params, callback);
                if($window.share.isInWeChat())
                    return $window.WeixinJSBridge.invoke('getBrandWCPayRequest', {
                        appId: params.appId,
                        timeStamp: params.timeStamp,
                        nonceStr: params.nonceStr,
                        package: params.package,
                        signType: params.signType,
                        paySign: params.paySign
                    }, callback);
            },
            getWeChatAccount: function(params, callback){
                if(!$window.sync.isHostInApp())
                    return;
                $window.sync.invoke('getUserWXInfo', params, callback);
            },
            getWeChatOAuthCode: function(params, callback){
                if(!$window.sync.isHostInApp())
                    return;
                $window.sync.invoke('getWeChatOAuthCode', params, callback);
            },
            getUserAgent: function(){
                return {
                    buildNumber: $window.sync.buildNumber,
                    packageName: $window.sync.package
                };
            },
            isHostInApp: function(){
                return $window.sync.isHostInApp();
            },
            isSupport: function(eventName){
                switch(eventName){
                case 'getCurrentUser':
                case 'leftMenuButtonClosed':
                case 'setLeftMenuButtonTitle':
                case 'setCurrentLocation':
                case 'redirectToPage':
                case 'logout':
                    if(!$window.sync.isHostInApp())
                        return false;
                    if(window.sync.buildNumber <= 20)
                        return false;
                    return true;
                case 'enableShare':
                case 'disableShare':
                    if(!$window.sync.isHostInApp())
                        return false;
                    if(window.sync.buildNumber <= 20 || window.sync.buildNumber >= 33)
                        return false;
                    return true;
                case 'showMenuItems':
                case 'hideMenuItems':
                    if(!$window.sync.isHostInApp())
                        return false;
                    if(window.sync.buildNumber < 33)
                        return false;
                    return true;
                case 'goAlipay':
                    if($window.sync.isHostInApp() && window.sync.buildNumber > 20)
                        return true;
                    if($window.share.isInWeChat())
                        return true;
                    return false;
                case 'goWXpay':
                    if($window.sync.isHostInApp() && window.sync.buildNumber >= 46)
                        return true;
                    if($window.share.isInWeChat())
                        return true;
                    return false;
                default:
                    return false;
                }
            }
        };
    }]);
})(angular);
