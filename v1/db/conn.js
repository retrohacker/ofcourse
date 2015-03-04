var pg = module.exports = require('pg-query')
var init = require('./init.js')
var connString = process.env.DATABASE_URL || "postgres://postgres@127.0.0.1:5432/postgres"
pg.pg = require('pg')
pg.pg.defaults.poolSize = process.env.DATABASE_CONNS || 20
pg.connectionParameters = connString

init(pg)
