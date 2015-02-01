var module = module || {}
var Backbone = Backbone || require('backbone')

var CourseModel =  module.exports = Backbone.Model.extend({
  validate:function(attributes,options){
  }
})

module.exports.tableName = "courses"
module.exports.types = {
  university: 'integer references universities(id) not null',
  id: 'serial primary key',//This will link all occurances of this class
  title: 'varchar(50) not null',
  department: 'varchar(10) not null',
  number: 'integer not null',
  section: 'integer not null',
  start: 'timestamp not null',
  end: 'timestamp not null'
}
