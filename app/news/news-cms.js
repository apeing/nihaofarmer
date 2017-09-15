/**
 * Created by Administrator on 2017/9/14.
 */
/**
 * Created by Administrator on 2017/9/8.
 */

const express = require('express');
const router = express.Router();

const mdata = require('../model/newsdata');
var async = require('async');
var moment = require('moment');
var request = require('request');
var co = require('co');

router.get('/updata',function(req,res,next){
    var type = req.query.type;
    var types = ['top','guonei','guoji'];
    async.map(types,function(item,callback){
        request.get({url:'http://toutiao-ali.juheapi.com/toutiao/index?type=' + item,headers:{'Content-Type':'application/json','Authorization':'APPCODE 5a95cb4d848141b88a8ba8079bcd1f1e'}},
            function(error, response, body){
                if(error){
                    return callback(error);
                }
                if(response.statusCode == 200){
                    co.wrap(function* (){
                        var bodyjson = JSON.parse(body);
                        bodyjson.result.data.forEach(function(item){
                            mdata.find({'date':{'$gte':item.date}},function(err,result){
                                if(err) return ;
                                if(result.length) return;
                                mdata.create(item,function(err2, dataresult){
                                    if(err2) return;
                                });
                            });
                        });
                    })().then(function(){
                        setTimeout(function(){
                            callback(null,{msg:"ok"});
                        },200);
                    }).catch(next);
                }else {
                    callback(null,{});
                }
            }
        );
    },function(err3,result2){
        if(err3) return next(err3);
        return res.status(201).json({"result2":result2});
    });
});

router.get('/remove',function(req, res, next){
    var type = req.query.type;
    mdata.remove({},function(err,result){
        if(err) return next(err);
        return res.status(201).json(result);
    });
});

module.exports = router;