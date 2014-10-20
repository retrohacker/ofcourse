var express = require('express')
var app = express();
var path = require('path')
var V1 = require('./v1/api.js')

app.set('port', (process.env.PORT || 5000))
app.use(express.static(__dirname + '/frontend/build'))
app.use("/v1",V1)

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
})

app.get("/",function(req,res) {
  res.send('<html><head><script src="/min.js"></script><link href="/min.css"/></head><body></body></html>')
})

