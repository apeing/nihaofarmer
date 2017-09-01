/**
 * Created by Administrator on 2017/8/21.
 */
const express = require('express');
const router = express.Router();

const NSError = require('../lib/error-model');
const User = require('../model/weuser');

router.post('/load', function(req, res, next){
    var mobile = req.body.mobile;
    var password =  req.body.password;
    User.findOne({'mobile': mobile}, function(err, user){
        if (err) return next(err);
        if (!user) return next(NSError.warning('账号或密码错误，请重新输入。'));
        var isMatch = user.comparePassword(password);
        if (!isMatch) return next(NSError.warning('账号或密码错误，请重新输入。'));
        var expireTime = new Date(Date.now() + 1800000);
        res.cookie('mobile', user.mobile, {'expires': expireTime});
        return res.status(200).json({});
    });
});

router.post('/register', function(req, res, next){
    var mobile = req.body.mobile;
    var password = req.body.password;
    User.findOne({'mobile': mobile}, function(err, result){
        if (err) return next(err);
        if (result) return next(NSError.warning('存在同名账户，请换一个用户名'));
        User.create({'mobile': mobile, 'password': password}, function(err, user){
            if(err) return next(err);
            return res.status(201).json({'message': user.mobile + '创建成功'});
        });
    });
});

router.use('/', function(req, res, next){
    var mobile = req.cookies.mobile;
    if(!mobile) return next(NSError.needLogin('超时，请重新登陆'));
    User.findOne({'mobile':mobile}, function(err, user){
        if(err) return next(err);
        if (!user) return next(NSError.needLogin(password));
        req.currentUser = user;
        return next();
    });
});

router.get('/user',function(req, res, next){
    //   console.log("currentUser : " + JSON.stringify(req.currentUser));
    return res.status(201).json({
        mobile: req.currentUser.mobile
    });
});


module.exports = router;