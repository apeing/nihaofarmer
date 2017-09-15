/**
 * Created by Administrator on 2017/9/8.
 */

const express = require('express');
const router = express.Router();

const NSError = require('../lib/error-model');
const User = require('../model/newsuser');
const mdata = require('../model/newsdata');
const data = require('./data.json');
var request = require('request');
var async = require('async');
var moment = require('moment');

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
    var type = req.query.type;
    var typemod = "头条";
    if(type === "top")
        typemod = "头条";
    else if(type === "guonei")
        typemod = "国内";
    else if(type === "guoji")
        typemod = "国际";
    var timestr = moment().format("YYYY-MM-DD");
    mdata.find({category:typemod,date:{"$gte":timestr}},function(err,result){
        async.map(result,function(item,callback){
            var img = [];
            img.push({height:479,width:779,url:item.thumbnail_pic_s});
            callback(null,{allList:item.title,pubDate:item.date,havePic:"true",title:item.title,channelName:typemod,imageurls:img,desc:item.title,source:item.author_name,channelId:item.uniquekey,link:item.url});
        },function(err,result){
            if(err) return next(err);
            //console.log("result : " + result);
            data.showapi_res_body.pagebean.contentlist = result;
            return res.status(201).json(data);
        });
    });
});

router.post('/post/test',function(req,res,next){
    var username = req.body.username;
    var password = req.body.password;
    return res.status(201).json({'username':username,'password':password});
});
router.use('/cms',require('./news-cms'));
module.exports = router;