/**
 * Created by Administrator on 2017/9/8.
 */

const express = require('express');
const router = express.Router();

const NSError = require('../lib/error-model');
const User = require('../model/newsuser');
const data = require('./data.json');

router.post('/login',function(req,res,next){
    var username = req.body.username;
    var password = req.body.password;
    User.findOne({'username': username}, function(err, user){
        if (err) return next(err);
        if (!user) return next(NSError.warning('账号或密码错误，请重新输入。'));
        var isMatch = user.comparePassword(password);
        if (!isMatch) return next(NSError.warning('账号或密码错误，请重新输入。'));
        return res.status(200).json({});
    });
});

router.post('/register',function(req,res,next){
    var username = req.body.username;
    var password = req.body.password;
    User.findOne({'username': username}, function(err, result){
        if (err) return next(err);
        if (result) return next(NSError.warning('存在同名账户，请换一个用户名'));
        User.create({'username': username,'password':password}, function(err, user){
            console.log("register post create");
            if(err) return next(err);
            return res.status(201).json({'username': user.username,'token':user.token});
        });
    });
});

router.get('/data',function(req, res, next){
    return res.status(201).json(data);
});

router.post('/post/test',function(req,res,next){
    var username = req.body.username;
    var password = req.body.password;
    console.log("username : " + username);
    return res.status(201).json({'username':username,'password':password});
});

module.exports = router;