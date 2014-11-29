var isDev = require('isdev')
var session = require('express-session');
var RedisStore = require('connect-redis')(session)
var redis = require('redis')

var client = (process.env.REDIS_URL) ? redis.createClient(process.env.REDIS_PORT,process.env.REDIS_URL) : redis.createClient()

client.auth(process.env.REDIS_AUTH,function() {
  console.log("Connected to Redis")
})
client.on('error',function(e) {
  console.log("Redis Error: "+e)
})

module.exports = session({
  secret: '#fuckitshipit',
  store: new RedisStore({'client':client})
})
