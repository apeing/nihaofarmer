/**
 * Created by Administrator on 2017/9/8.
 */

const express = require('express');
const router = express.Router();

const NSError = require('../lib/error-model');
const User = require('../model/newsuser');
const data = require('./data.json');


router.get('/register',function(req,res,next){
    var username = req.body.username;
    var password = req.body.password;
    User.findOne({'username': username}, function(err, result){
        if (err) return next(err);
        if (result) return next(NSError.warning('存在同名账户，请换一个用户名'));
        User.create({'mobile': mobile, 'password': password}, function(err, user){
            if(err) return next(err);
            return res.status(201).json({'username': user.username,'token':user.token});
        });
    });
});

router.get('/data',function(req, res, next){
    return res.status(201).json(data);
});

module.exports = router;