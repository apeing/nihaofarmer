/**
 * Created by Administrator on 2017/9/7.
 */
const request = require('supertest');
const app = require('../app');

describe('restapi测试',function(){
    it('get七牛token测试',function(done){
        request(app)
            .get('/qiniu/qupload')
            .expect('Content-Type', /json/)
            .expect('Content-Length', '134')
            .expect(200)
            .end(function(err, res) {
                if (err) throw done(err);
                done();
            });
    });
});

