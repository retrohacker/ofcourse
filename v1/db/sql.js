var m = module.exports = {}

m.insert = function insertCommand(model,values) {
  var result = 'INSERT INTO '+model.tableName+' ('
  var arr = []
  var modelVals = Object.keys(model.types)
  Object.keys(values).forEach(function(v) {
    if(modelVals.indexOf(v) !== -1)
      result += '"'+v+'",' // Add the var name
  })
  result = result.slice(0,-1) // remove trailing comma
  result += ') VALUES ('
  var index = 1
  Object.keys(values).forEach(function(v) {
    if(modelVals.indexOf(v) !== -1) {
      arr.push(values[v])
      result += "$"+(index++)+"," // Add the value
    }
  })
  result = result.slice(0,-1) // remove trailing comma
  result += ') RETURNING id'
  return {str:result,arr:arr}
}

m.update = function updateCommand(model,values) {
  var result = 'UPDATE '+model.tableName+' SET '
  var modelVals = Object.keys(model.types)
  Object.keys(values).forEach(function(v) {
    if(modelVals.indexOf(v) !== -1) {
      if(values[v] != 'id' && values[v] != null){
        result += '"'+v+'" = ' // Add the var name
        result += "'"+values[v]+"'," // Add the value
      }
    }
  })
  result = result.slice(0,-1) // remove trailing comma
  result += ' WHERE id='
  result += values['id'] //conditions - optional
  result += ' RETURNING id'
  return result
}
