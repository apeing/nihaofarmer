/**
 * Created by Administrator on 2017/9/8.
 */
'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var sha1 = require('sha1');

var NewsuerSchema = new Schema({
    username: { type: String, required: true },   //用户名
    password: { type: String, required: true },
    status: {type: String, default: 'Active'}, //帐户状态
    token: String,  //登录token
    createtime: String
});

NewsuerSchema.index({ 'username': 1 }, { 'unique': true });

NewsuerSchema.pre('save', function(next) {
    var user = this;
    if (!user.isModified('password')) return next();
    user.password = sha1(user.password);
    next();
});

NewsuerSchema.methods.comparePassword = function(candidatePassword) {
    return sha1(candidatePassword) === this.password;
};

var Nuser;

if (mongoose.models.newsuser) {
    Nuser = mongoose.model('newsuser');
} else {
    Nuser = mongoose.model('newsuser', NewsuerSchema, 'newsusers');
}

module.exports = Neuser;