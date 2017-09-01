/**
 * Created by Administrator on 2017/8/2.
 */
'use strict';
const express = require('express');
const router = express.Router();

router.use('/wechat',require('./wechat'));

module.exports = router;