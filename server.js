var app = require('./app');
var meta = require('./package.json');

var port = '80';
var server = app.listen(port,function(){
  console.log('【%s】正在监听端口: %s', meta.name, server.address().port);
})