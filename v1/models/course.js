var Backbone = Backbone || require('backbone')

var CourseModel =  Backbone.Model.extend({
  url: '/v1/course/',
  validate:function(attributes,options){
  }
})

CourseModel.tableName = "courses"
CourseModel.types = {
  university: 'integer references universities(id) not null',
  id: 'serial primary key',//This will link all occurances of this class
  title: 'varchar(50) not null',
  department: 'varchar(10) not null',
  number: 'integer not null',
  section: 'integer not null',
  start: 'timestamp not null',
  end: 'timestamp not null'
}

if(typeof module !== 'undefined' && module.exports) {
  module.exports = CourseModel
}
