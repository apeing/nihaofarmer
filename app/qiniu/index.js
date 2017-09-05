/**
 * Created by Administrator on 2017/9/04.
 */
const express = require('express');
const router = express.Router();
const qiniu = require('qiniu');
const config = require('../config');

router.get('/qupload',function(req,res,next){
    var bucket = config.qiniu.bucket;
    var accessKey = config.qiniu.accessKey;
    var secretKey = config.qiniu.secretKey;
    var mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
    var options = {
        scope: bucket,
    }
    var putPolicy = new qiniu.rs.PutPolicy(options);
    var uploadToken = putPolicy.uploadToken(mac);
    return res.json({
        token: uploadToken
    });
});

module.exports = router;