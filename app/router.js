/**
 * Created by Administrator on 2017/8/2.
 */
'use strict';
const express = require('express');
const router = express.Router();

router.use('/newsapi',require('./news'));
router.use('/qiniu',require('./qiniu'));
router.use('/wechat',require('./wechat'));

module.exports = router;