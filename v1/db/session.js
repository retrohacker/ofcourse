var isDev = require('isdev')
var session = require('express-session');
var RedisStore = require('connect-redis')(session)
var redis = require('redis')
var platform = process.platform

var client = (isDev) ? (platform == "darwin" ? redis.createClient(6379, "192.168.59.103"): redis.createClient()) : 
  redis.createClient(10982,'pub-redis-10982.us-east-1-2.5.ec2.garantiadata.com')
  
client.auth('4mgrkMOXRqu9TbkE',function() {
  console.log("Connected to Redis")
})
client.on('error',function(e) {
  console.log("Redis Error: "+e)
})

module.exports = session({
  secret: '#fuckitshipit',
  store: new RedisStore({'client':client})
})
