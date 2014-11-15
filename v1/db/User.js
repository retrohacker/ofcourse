var user = module.exports = {}
var db = require('../db/database.js')
var UserModel = require('../models/UserModel.js')

//USING POSTGRES
user.insert = function insert(values,cb) {
  db(insertCommand(UserModel,values.toJSON()),function(e,rows,result) {
    if(e) return cb(e)
    return cb(null,result.rows[0].id)
  })
}

user.update = function update(values,cb) {
  db(updateCommand(UserModel,values.toJSON()),function(e,rows,result) {
    if(e) return cb(e)
    return cb(null,result.rows[0].id)
  })
}

 user.get = function get(id,cb) {
   db("select * from users where id="+id,function(e,rows,result) {
     if(e) return cb(e)
     cb(null,result.rows[0])
   })
 }
 
 user.getEvents = function get(id,cb) {
   db("select * from events where userid="+id,function(e,rows,result) {
     //console.log('db/User.js: ',result.rows)
     if(e) return cb(e)
     cb(null,result.rows)
   })
 }
 
  user.getCoursesByUniversity = function get(university,cb) {
   db("select * from courses where university='"+university+"'",function(e,rows,result) {
     if(e) return cb(e)
     cb(null,result.rows)
   })
 }

user.getUserByEmail = function getUserByEmail(email,done) {
  var results = db(getUserByEmailCommand(email), function(err, rows, result) {
    if(err) return done(err,null)
    if(result.rowCount == 0) {
      return done('no users with that email address',null)
    }
    if(result.rowCount > 1) {
      return done('error: multiple users with that email address',rows[0])
    }
    //console.log(rows)
    //console.log(result)
    
    //this still needs work....
    return done(null,rows)
  });
}

function getUserByEmailCommand(email){
  var result = "SELECT * FROM users WHERE email='"
  result += email
  result += "'"
  return result
}

function insertCommand(model,values) {
  var result = 'INSERT INTO '+model.tableName+' ('
  var modelVals = Object.keys(model.types)
  Object.keys(values).forEach(function(v) {
    if(modelVals.indexOf(v) !== -1)
      result += '"'+v+'",' // Add the var name
  })
  result = result.slice(0,-1) // remove trailing comma
  result += ') VALUES ('
  Object.keys(values).forEach(function(v) {
    if(modelVals.indexOf(v) !== -1)
      result += "'"+values[v]+"'," // Add the value
  })
  result = result.slice(0,-1) // remove trailing comma
  result += ') RETURNING id'
  //console.log(result)
  return result
}

function updateCommand(model,values) {
  var result = 'UPDATE '+model.tableName+' SET '
  var modelVals = Object.keys(model.types)
  Object.keys(values).forEach(function(v) {
    if(modelVals.indexOf(v) !== -1)
      if(values[v] != 'id')
        result += '"'+v+'" = ' // Add the var name
        result += "'"+values[v]+"'," // Add the value
  })
  result = result.slice(0,-1) // remove trailing comma
  result += ' WHERE id='
  result += values['id'] //conditions - optional
  result += ' RETURNING id'
  //console.log(result)
  return result
}
