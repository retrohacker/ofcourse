var isDev = require('isdev')
var session = require('express-session');
var RedisStore = require('connect-redis')(session)
var redis = require('redis')

var client = (isDev) ? redis.createClient() : redis.createClient('10982,pub-redis-10982.us-east-1-2.5.ec2.garantiadata.com')
client.on('connect',function() {
  client.auth('4mgrkMOXRqu9TbkE',function() {
    console.log("Connected to Redis")
  })
})

client.on('error',function(e) {
  console.log("Redis Error: "+e)
})

module.exports = session({
  secret: '#fuckitshipit',
  store: new RedisStore({'client':client})
})
