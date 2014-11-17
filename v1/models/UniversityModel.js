var module = module || {}
var Backbone = Backbone || require('backbone')

var UniversityModel =  module.exports = Backbone.Model.extend({
  validate:function(attributes,options){
  }
})

module.exports.tableName = "universities"
module.exports.types = {
  id: 'serial primary key',
  name: 'varchar(50) not null',
  abbreviation: 'varchar(8) not null',
  state: 'varchar(2)', //Start date time  YYYY-MM-DD'T'HH:MM:SS
  city: 'varchar(50)'  //End date time    YYYY-MM-DD'T'HH:MM:SS
}
