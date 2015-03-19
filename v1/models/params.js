var Backbone = require('backbone')

var ParamsModel = Backbone.Model.extend({
})

ParamsModel.tableName = 'params'
ParamsModel.types = {
  "key":"varchar(50) not null",
  "value":"varchar(50) not null"
}

ParamsModel.unique = ['key']

module.exports = ParamsModel
