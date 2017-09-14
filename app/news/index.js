/**
 * Created by Administrator on 2017/9/8.
 */

const express = require('express');
const router = express.Router();

const NSError = require('../lib/error-model');
const User = require('../model/newsuser');
const data = require('./data.json');
var request = require('request');
var async = require('async');

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
    console.log("type : " + type);
    request.get({url:'http://toutiao-ali.juheapi.com/toutiao/index?type=' + type,headers:{'Content-Type':'application/json','Authorization':'APPCODE 5a95cb4d848141b88a8ba8079bcd1f1e'}},
        function(error, response, body){
            if(error){
                console.log("err : " + error);
                return ;
            }
            if(response.statusCode == 200){
                //console.log("body : " + body);
                var bodyjson = JSON.parse(body);
                if(bodyjson.result.stat === "1"){
                    async.map(bodyjson.result.data,function(item,callback){
                        var img = [];
                        img.push({height:479,width:779,url:item.thumbnail_pic_s});
                        callback(null,{allList:item.title,pubDate:item.date,havePic:"true",title:item.title,channelName:"国内最新",imageurls:img,desc:item.title,source:item.author_name,channelId:item.uniquekey,link:item.url});
                    },function(err,result){
                        if(err) return next(err);
                        //console.log("result : " + result);
                        data.showapi_res_body.pagebean.contentlist = result;
                        return res.status(201).json(data);
                    });
                }
            }
          //  return res.status(201).json({});
        }
    );
});

router.post('/post/test',function(req,res,next){
    var username = req.body.username;
    var password = req.body.password;
    console.log("username : " + username);
    return res.status(201).json({'username':username,'password':password});
});

module.exports = router;