require('newrelic')
var express = require('express')
var app = express();
var path = require('path')
var V1 = require('./v1/api.js')
var jade = require('jade')
var index = jade.renderFile(path.join(__dirname,'index.jade'))
var logger = require('./logger')

app.set('port', (process.env.PORT || 5000))
app.use(express.static(path.join(__dirname,'frontend','build')))
app.use('/v1',V1)

app.listen(app.get('port'), function() {
  logger.info('Node app is running at localhost:' + app.get('port'))
})

app.get('/',function(req,res) {
  res.send(index)
})

app.get('/favicon.ico',function(req,res) {
  var icon = path.resolve('./frontend','build','static','images','favicon.ico')
  logger.info('Sending ',icon)
  res.sendFile(icon,function(e) {
    if(e) logger.error(e)
  })
})
