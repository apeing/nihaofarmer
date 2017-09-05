(function($window){
    'use strict';
    if(!$window.http) throw new Error('does not include https library, please ask xhuang for help');
    $window.onerror = function (errorMsg, url, lineNumber, column, errorObj) {
        var strErrors = $window.sessionStorage.getItem('errors') || '[]';
        var errors = JSON.parse(strErrors);
        errors.push({
            timeStamp: new Date(),
            errorMsg: errorMsg,
            url: url,
            lineNumber: lineNumber,
            column: column,
            errorObj: errorObj
        });
        $window.sessionStorage.setItem('errors', JSON.stringify(errors));
    };

    if($window.sessionStorage)
        window.setInterval(function() {
            var strErrors = $window.sessionStorage.getItem('errors') || '[]';
            var errors = JSON.parse(strErrors);
            if(errors.length <= 0) return;
            $window.http.post($window.config.errorReport || '/error/push', {}, errors, function(err){
                if(err) return;
                var strErrors = $window.sessionStorage.getItem('errors') || '[]';
                var savedErrors = JSON.parse(strErrors);
                var newErrors = [];
                for(var i = 0; i < savedErrors.length; i++){
                    if(!ifContains(savedErrors[i], errors))
                        newErrors.push(savedErrors[i]);
                }
                $window.sessionStorage.setItem('errors', JSON.stringify(newErrors));
            });
        }, 10000);

    function ifContains(error, errors){
        for(var i = 0; i < errors.length; i++){
            if(error.timeStamp === errors[i].timeStamp)
                return true;
        }
        return false;
    }
})(window);