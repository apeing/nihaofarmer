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
 //   var type = req.query.type;
    var types = ['top','guonei','guoji'];
    async.map(types,function(item,callback){
        request.get({url:'http://toutiao-ali.juheapi.com/toutiao/index?type=' + item,headers:{'Content-Type':'application/json','Authorization':'APPCODE 084e91dd72a045148bd5707dd8ea598d'}},
            function(error, response, body){
                if(error){
                    return callback(error);
                }
                if(response.statusCode == 200){
                    var bodyjson = JSON.parse(body);
                    async.map(bodyjson.result.data,function(item2,cb){
                        mdata.find({'date':{'$gte':item2.date}},function(err,result){
                            if(err) return cb(err);
                            if(result.length) return cb(null,{err:"没有数据"});
                            mdata.create(item2,function(err2, dataresult){
                                if(err2) return;
                                cb(null,{item:item2});
                            });
                        });
                    },function(err2,result){
                        if(err2) return callback(err2);
                        callback(null,{type:item,length:result.length});
                    });
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