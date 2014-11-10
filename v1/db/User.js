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
  console.log(result)
  return result
}
