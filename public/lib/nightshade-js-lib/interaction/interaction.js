(function(){
    'use strict';
    var appInvokeQueues = {};
    var jsObserverQueues = {};
    var appShareInfo;

    function getUserAgent(){
        var features = navigator.userAgent.split(' ');
        for(var i = 0; i < features.length; i++){
            if(features[i].indexOf('com.tomatotown.') > -1){
                var params = features[i].split('/');
                return {
                    package: params[0],
                    buildNumber: params[1]
                };
            }
        }
        return undefined;
    }
    
    window.tomatoTownJs = {
        invoke: function(action, params, identifier){
            var debug = window.tomatoTownApp && window.tomatoTownApp.isDebugging();
            if(debug) alert('js invoke called with ' + action + ' ');
            switch(action){
            case 'getShareInfo':
                if(appShareInfo) return window.sync.callback(undefined, 'getShareInfo', appShareInfo, identifier);
                if(!window.share || !window.share.getShareInfo) throw new Error('does not include share library, please ask help'); 
                var shareInfo = window.share.getShareInfo();
                return window.sync.callback(undefined, 'getShareInfo', shareInfo, identifier);
            case 'leftMenuButtonOpened':
            case 'leftMenuButtonClosed':
            case 'itemDetailClosed':
            case 'tabBarSwitched':
                if(debug) alert('prepare to boardcast ' + action);
                return window.sync.boardcast(action, params, function(){
                    return window.sync.callback(undefined, action, undefined, identifier);
                });
            default: 
                return window.sync.callback(window.sync.newError(500, '出错了'), action, undefined, identifier);
            }
        },
        callback: function(stringErr, action, stringResult, identifier){
            var debug = window.tomatoTownApp && window.tomatoTownApp.isDebugging();
            if(debug) alert('js callback begin with ' + action + ' ' + stringResult);
            
            var results = JSON.parse(stringResult || null);
            var err = stringErr ? JSON.parse(stringErr) : null;
            for(var i = 0; i < appInvokeQueues[action].length; i++){
                if(appInvokeQueues[action][i].key === identifier){
                    appInvokeQueues[action][i].callback(err, results);
                    appInvokeQueues[action].splice(i, 1);
                    return;
                }
            }
            if(debug) alert('no callback register');
        }
    };

    window.sync = {
        callback : function(err, action, params, identifier){
            var debug = window.tomatoTownApp && window.tomatoTownApp.isDebugging();
            if(debug) alert('Begin app callback with ' + action);
            if(window.tomatoTownApp && window.tomatoTownApp.callback){
                var result = {
                    action: action,
                    error: err,
                    result: params,
                    identifier: identifier
                };
                window.tomatoTownApp.callback(JSON.stringify(result));
                if(debug) alert('App callback called with ' + action);
            }
        },
        invoke: function(action, params, callback){
            var identifier = new Date().getTime().toString();
            if(!appInvokeQueues[action])
                appInvokeQueues[action] = [];
            appInvokeQueues[action].push({key: identifier, callback: callback});

            var debug = window.tomatoTownApp && window.tomatoTownApp.isDebugging();
            if(debug) alert('Begin app invoke with ' + action);
            if(window.tomatoTownApp && window.tomatoTownApp.invoke){
                var result = {
                    action: action,
                    identifier: identifier,
                    params: params
                };
                window.tomatoTownApp.invoke(JSON.stringify(result));
                if(debug) alert('App invoke called with ' + action);
            }
        },
        isHostInApp: function(){
            return getUserAgent() || window.tomatoTownApp;
        },
        newError: function(code, message, err){
            return {
                code: code,
                message: message,
                internelErr: err
            };
        },
        addObserver: function(action, key, callback){
            if(!jsObserverQueues[action])
                jsObserverQueues[action] = {};
            jsObserverQueues[action][key] = {
                callback: callback
            };
        },
        removeObserver: function(action, key){
            if(!jsObserverQueues[action])
                return;
            if(!jsObserverQueues[action][key])
                return;
            jsObserverQueues[action][key] = null;
        },
        boardcast: function(action, params, callback){
            var debug = window.tomatoTownApp && window.tomatoTownApp.isDebugging();
            if(debug) alert('Begin boardcast ' + action);
            if(!jsObserverQueues[action])
                return;
            for(var key in jsObserverQueues[action]){
                jsObserverQueues[action][key].callback(function(isSuccess){
                    jsObserverQueues[action][key].result = isSuccess;
                    var allFinished = true;
                    for(var key1 in jsObserverQueues[action]){
                        if(jsObserverQueues[action][key1].result === undefined)
                            allFinished = false;
                    }
                    if(allFinished){
                        for(var key2 in jsObserverQueues[action]){
                            jsObserverQueues[action][key2].result = undefined;
                        }
                        callback();
                    }
                    if(debug) alert('boardcasted ' + action);
                }, params);
            }
        },
        initShareData: function(description, logo, title, link, successFn, cancelFn){
            appShareInfo = {
                description: description,
                title: title || document.title,
                imgUrl: logo,
                url: link || window.location.href,
                successFn: successFn,
                cancelFn: cancelFn
            };
        },
        package: getUserAgent() ? getUserAgent().package : '',
        buildNumber: (getUserAgent() ? getUserAgent().buildNumber : undefined) 
            || (window.tomatoTownApp ? window.tomatoTownApp.getBuildNumber ? window.tomatoTownApp.getBuildNumber() : 0 : 0)
    };
})();

