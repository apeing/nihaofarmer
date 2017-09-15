/**
 * Created by Administrator on 2017/9/13.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var sha1 = require('sha1');

var NewsdataSchema = new Schema({
    uniquekey: { type: String, required: true },   //用户名
    title: { type: String, required: true },
    date: String, //时间
    category: String,  //type
    author_name: String,
    url:String,
    thumbnail_pic_s:String
});

//NewsdataSchema.index({ 'username': 1 }, { 'unique': true });


NewsdataSchema.methods.comparePassword = function(candidatePassword) {
    return sha1(candidatePassword) === this.password;
};

var Ndata;

if (mongoose.models.newsdata) {
    Ndata = mongoose.model('newsdata');
} else {
    Ndata = mongoose.model('newsdata', NewsdataSchema, 'newsdatas');
}

module.exports = Ndata;