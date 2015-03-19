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
var hash = require('hash-files')
var logger = require('../../logger')
var model = require('../models')
var fs = require('fs')
var db = require('./index.js')
var once = require('once')

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
                'course_user',
                'params'
             ]

module.exports = function(db) { //TODO: give this a callback
  //Create a table for each of the models in the models array
  async.waterfall([
    function(cb) {
      cb = once(cb)
      db.first("select * from params where key='db_version'",function(e,db_version) {
        return cb(null,e,db_version)
      })
    },
    function(e,db_version,cb) {
      cb = once(cb)
      if(!e&&db_version) return cb(null,db_version.val)
      return createModels(function(e) {cb(e,null)})
    },
    function(db_version,cb) {
      cb = once(cb)
      var files = models.map(function(v) {return path.resolve(__dirname,modelsPath,v+'.js')})
      return hash({files:files},function(e,hash) { cb(e,hash,db_version) })
    },
    function(hash,db_version,cb) {
      cb = once(cb)
      if(hash != db_version) updateParam('db_version',hash,cb)
      // TODO: migrate database if changed
      return cb()
    },
    function(cb) {
      cb = once(cb)
      db.first("select * from params where key='siu_spring_2015_version'",function(e,version) {
        return cb(null,e,version)
      })
    },
    function(e,version,cb) {
      cb = once(cb)
      if(!e&&version) return cb(null,version.val)
      return createCourses(function(e) {cb(e,null)})
    },
    function(version,cb) {
      cb = once(cb)
      hash({files:[path.join(__dirname,'siu_spring_2015.json')]},function(e,hash) { cb(e,hash,version) })
    },
    function(hash,version,cb) {
      cb = once(cb)
      if(hash != version) return updateParam('siu_spring_2015_version',hash,cb)
      // TODO: migrate database if changed
      return cb()
    }
  ],function(e) {
    if(e) return logger.error(e)
    logger.info("Finished setting up database.")
  })
}

function updateParam(key,value,cb) {
      cb = once(cb)
  db.db("delete from params where key='test'",[key],function() {
    db.db("insert into params (key,value) VALUES ($1::text, $2::text)",[key,value],function(e) {
      cb()
    })
  })
}

function createCourses(cb) {
  cb = once(cb)
  async.waterfall([
    function(cb) {
      cb = once(cb)
      return db.db("select * from universities where name='Southern Illinois University'",cb)
    },
    function(rows,result,cb) {
      cb = once(cb)
      if(result.rowCount == 0) {
        logger.info('init.js: inserting default universities into database')
        return db.db("insert into universities (name,abbreviation,state,city) values "
        + "('Southern Illinois University','SIU','IL','Carbondale') returning id",cb)
      }
      return cb(null,rows,result)
    },
    function(rows,result,cb) {
      cb = once(cb)
      populateCourses(result.rows[0].id,cb)
    }
  ],function(e) {
    if(e) return logger.error(e)
    cb()
  })
}

function createModels(cb) {
  cb = once(cb)
  async.eachSeries(models,function(model,cb) {
    cb = once(cb)
    logger.info("Attempting to create table "+model+"...")
    var model = require(path.join(modelsPath,model+'.js'))
    db.db(createTable(model.tableName,model.types,model.unique),cb)
  },function(e) {
    if(e) return cb(e)
    logger.info('init.js: inserting default universities into database')
    db.db("insert into universities (name,abbreviation,state,city) values "
    + "('Southern Illinois University','SIU','IL','Carbondale') returning id",cb)
  })
}

function populateCourses(uni,cb) {
  cb = once(cb)
  fs.readFile(path.join(__dirname,'siu_spring_2015.json'),{encoding:'utf-8'},function(e,file) {
    if(e) return logger.error(e)
    var obj = JSON.parse(file)
    async.each(obj.classes,function(c,cb) {
      cb = once(cb)
      var course = new model.Course(c)
      course.set('university',uni)
      course.set('semester','Spring 2015')
      var parent = new model.ParentEvent(c)
      logger.info('Adding '+c.title)
      db.user.addCourse(course,0,function(e,cid) {
        if(e) {
          logger.warn(e)
          cb()
          return db.db("",function(){}) //keep loop from hanging. TODO: WHY?!??!?!?!?!?
        }
        parent.set('cid',cid)
        parent.set('cron',JSON.stringify(c.cron))
        db.user.addParentEvent(parent,function(e) {
          if(e) logger.warn(e)
          cb()
        })
      })
    },function() {
      logger.info("Finished populating assignments")
      return cb()
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
