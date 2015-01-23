var express = require("express");
var bodyParser = require('body-parser');
var app = express();

app.set('port', process.env.PORT || 8080);

app.get('/', function(req,res){
  console.log(req);
  res.send('hello world');
});



app.listen(app.get('port'));
