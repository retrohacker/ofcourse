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
  title: 'varchar(500) not null',
  department: 'varchar(10) not null',
  number: 'varchar(6) not null',
  section: 'varchar(6) not null',
  start: 'timestamp not null',
  location: 'varchar(150) not null',
  instructor: 'varchar(500) not null',
  semester: 'varchar(50) not null',
  end: 'timestamp not null'
}

CourseModel.unique = ['department','number','section','semester']

if(typeof module !== 'undefined' && module.exports) {
  module.exports = CourseModel
}
