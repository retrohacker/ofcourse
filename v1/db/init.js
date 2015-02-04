/**
 * This module will bootstrap the DB if it isn't already initialized
 *
 * NOTE:
 * Do *NOT* assume you are the only one using the database. There could be
 * one ofcourse process running or 1000, and they will all call this init.
 */

var glob = require('glob')
var path = require('path')
var async = require('async')

/**
 * This is a special case. We are loading in all models from the models
 * directory to create tables for them in the database. Generally we try
 * to avoid directly requiring in files from other folders.
 */
//A path to the models directory in the project and the model names
var modelsPath = path.join('../','models')
var models = [
                'university',
                'user',
                'facebook',
                'course',
                'parentEvent',
                'event',
                'course_user'
             ]

module.exports = function(db) { //TODO: give this a callback
  //Create a table for each of the models in the models array
  async.eachSeries(models,function(model,cb) {
    console.log("Attempting to create table "+model+"...")
    var model = require(path.join(modelsPath,model+'.js'))
    db(createTable(model.tableName,model.types),cb)
  },function(e){
    if(e) throw e;
    db("select * from universities where name='Southern Illinois University'",function(e,rows,result) {
      if(e) return e
      if(result.rowCount == 0){
        console.log('init.js: inserting default universities into database')
        db("insert into universities (name,abbreviation,state,city) values "
        + "('Southern Illinois University','SIU','IL','Carbondale'),"
        + "('The Delaware One','TDO','DE','Delewareville')",function(e,rows,result) {
          if(e) return e
          return null
        })
    }
    console.log("Done setting up db")})

    return null
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
