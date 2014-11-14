/**
 * This module will bootstrap the DB if it isn't already initialized
 *
 * NOTE:
 * Do *NOT* assume you are the only one using the database. There could be
 * one ofcourse process running or 1000, and they will all call this init.
 */
var UserModel = require('../models/UserModel.js')
var FacebookModel = require('../models/FacebookModel.js')
var EventModel = require('../models/EventModel.js')

module.exports = function(db) {
  db(createTable(UserModel.tableName,UserModel.types),function(e) {
    if(e) throw e
    db(createTable(FacebookModel.tableName,FacebookModel.types),function(e) {
      if(e) throw e
    })
  })
  db(createTable(EventModel.tableName,EventModel.types),function(e) {
    if(e) throw e
  })
}

function createTable(title,types) {
  var result = 'CREATE TABLE IF NOT EXISTS '+title+' ('
  Object.keys(types).forEach(function(v) {
    result += '"'+v+'" ' // Add the var name
    result += types[v] + ',' // Add var type
  })
  result = result.slice(0,-1) // remove trailing comma
  result += ')'
  return result
}
