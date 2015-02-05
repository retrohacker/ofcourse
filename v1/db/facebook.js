var fb = module.exports = {}

var userDB = require('./user.js')
var db = require('./conn.js')
var models = require('../models')
var sql = require('./sql.js')

//USING POSTGRES
fb.updateOrCreate = function updateOrCreate(opts,cb) {
  if(!verifyOpts(opts,cb)) return null
  var vals = opts.values.toJSON()
  var modelVals = Object.keys(opts.model.types)
  //FIRST lets see if the fbid exists
  db("select * from "+opts.model.tableName+" where fbid = "+vals.fbid,function(e,rows,result) {
    if(e) return cb(e)
    if(result.rowCount !== 1) { //fbuser does not yet exist
      fb.insert(opts,function(e) {
        if(e) return cb(e)
        //fbuser exists, but we don't have an id yet
        userDB.insert(new models.User(vals),function(e,id) {
          //update fbuser
          db("update fb set id = "+id+" where fbid = "+vals.fbid,function(e) {
            if(e) return cb(e)
            return cb(null,id)
          })
        })
      })
    }
    //fbuser exists
    if(result.rows[0] && result.rows[0].id) {
      return cb(null,result.rows[0].id) //we have the user id
    }
    //fbuser exists, but we don't have an id yet
    userDB.insert(new models.User(vals),function(e,id) {
      //update fbuser
      db("update fb set id = "+id+" where fbid = "+vals.fbid,function(e) {
        if(e) return cb(e)
        return cb(null,id)
      })
    })
  })
}

fb.insert = function insert(opts,cb) {
  db(sql.insert(opts.model,opts.values.toJSON()),function(e,rows,result) {
    if(e) return cb(e)
  })
}

function verifyOpts(opts,cb) {
  if(!opts || typeof opts === "function") {
    cb(new Error("opts object required"))
    return false
  }
  if(!opts.model || !opts.values) {
    cb(new Error("opts.model must be an uninitialized backbone model " +
                 "and opts.values must be an initialied backbone model."))
    return false
  }
  return true
}
