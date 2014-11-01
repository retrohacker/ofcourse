var pg = module.exports = require('pg-query')
var isDev = require('isdev')
var connString
var init = require('./init.js')

if(isDev)
  connString = "postgres://postgres@127.0.0.1:5432/postgres"
else
  ; //TODO fill in stub for heroku

pg.connectionParameters = connString

init(pg)

module.exports = pg
