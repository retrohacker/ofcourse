var express = require("express");
var app = express();
var port = 8080;

app.get("/", function(req,res){
  res.send("working");
});

var io = require('socket.io').listen(app.listen(port));
console.log("middleman listening on port " + port);

io.sockets.on('connection', function (socket) {
  socket.emit('message', {message: 'send the notification' });
  socket.on('send', function (data) {
  console.log(data);
  });
});
