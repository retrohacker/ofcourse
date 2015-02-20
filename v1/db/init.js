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
var logger = require('../../logger')
var model = require('../models')
var fs = require('fs')
var db = require('./index.js')

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
    logger.info("Attempting to create table "+model+"...")
    var model = require(path.join(modelsPath,model+'.js'))
    db(createTable(model.tableName,model.types,model.unique),cb)
  },
  function(e) {
    if(e) throw e;
    db("select * from universities where name='Southern Illinois University'",function(e,rows,result) {
      if(e) return e
      if(result.rowCount == 0) {
        logger.info('init.js: inserting default universities into database')
        db("insert into universities (name,abbreviation,state,city) values "
        + "('Southern Illinois University','SIU','IL','Carbondale') returning id",function(e,rows,result) {
          if(e) return e
          populateCourses(result.rows[0].id)
          return null
        })
      }
      else {
        populateCourses(result.rows[0].id)
      }
      logger.info("Done setting up db")
    })
    return null
  })
}

function populateCourses(uni) {
  fs.readFile(path.join(__dirname,'siu_spring_2015.json'),{encoding:'utf-8'},function(e,file) {
    if(e) return logger.error(e)
    var obj = JSON.parse(file)
    async.eachSeries(obj.classes,function(c,cb) {
      var course = new model.Course(c)
      course.set('university',uni)
      course.set('semester','Spring 2015')
      var parent = new model.ParentEvent(c)
      logger.info('Adding '+c.title)
      db.user.addCourse(course,0,function(e,cid) {
        if(e) {
          logger.warn(e)
          cb()
        }
        parent.set('cid',cid)
        parent.set('cron',JSON.stringify(c.cron))
        db.user.addParentEvent(parent,function(e) {
          if(e) logger.warn(e)
          cb()
        })
      })
    })
  })
}

function createTable(title,types,unique) {
  var result = 'CREATE TABLE IF NOT EXISTS '+title+' ('
  Object.keys(types).forEach(function(v) {
    result += '"'+v+'" ' // Add the var name
    result += types[v] + ',' // Add var type
  })
  if(unique) {
    result += " UNIQUE ("
    unique.forEach(function(u) {
      result += u + ","
    })
    result = result.slice(0,-1) // remove trailing comma
    result += ")"
  } else
    result = result.slice(0,-1) // remove trailing comma
  result += ')'
  return result
}
