/**
 * Created by Administrator on 2017/9/4.
 */
'use strict';
const defaultEnv = 'development';
const nodeEnv = process.env.NODE_ENV || defaultEnv;
module.exports = require('./' + nodeEnv + '.json');
console.log('Server will start with config: ' + nodeEnv);