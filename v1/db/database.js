var pg = module.exports = require('pg-query')
var isDev = require('isdev')
var connString
var init = require('./init.js')
var platform = process.platform

if(isDev){
  if(platform == "darwin")
    connString = "postgres://postgres@192.168.59.103:5432/postgres"
  else
    connString = "postgres://postgres@127.0.0.1:5432/postgres"
}
else
  connString = "postgres://gfsfillahxrvsa:40mI24y9S5M66bOYQxGWz5og4w@ec2-54-197-227-238.compute-1.amazonaws.com:5432/d30k7bgpai6hjm"

pg.connectionParameters = connString

init(pg)

module.exports = pg
