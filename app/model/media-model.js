/**
 * Created by Administrator on 2017/8/25.
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//活动参与者上传照片
let mediaSchema = new Schema({
    mediaId: { type: String, required: true },               //照片上传用户id
    urls: { type: String, required: true },                         //照片url
    createdAt: {type: Date, default: Date.now}
});

var Mediamodel;

if (mongoose.models.mediamodel) {
    Mediamodel = mongoose.model('mediamodel');
} else {
    Mediamodel = mongoose.model('mediamodel', mediaSchema, 'medias');
}

module.exports = Mediamodel;
