//NOTE: This file exists as a symbolic link in frontend/js/models
var Backbone = Backbone || require('backbone')

var CourseModel =  Backbone.Model.extend({
  url: '/v1/course/',
  validate:function(attributes,options){
	  if(typeof attributes.university != 'number')
		return 'expected number for university'
      if(attributes.university < 0)
		return 'expected university greater than 0'
	  if(typeof attributes.id != 'number')
		return 'expected number for id'
      if(attributes.id < 0)
		return 'expected course id to be greater than 0'
	  if(typeof attributes.title == 'undefined')
	    return 'expected course to have a title'
	  if(attributes.title.length > 50)
		return 'course title is too long. 50 chars max.'
	  if(typeof attributes.department == 'undefined')
	    return 'expected course to have a department'
	  if(attributes.department.length > 10)
		return 'course department is too long. 10 chars max.'
	  if(typeof attributes.number != 'number')
	    return 'expected integer for course number'
	  if(typeof attributes.section != 'number')
	    return 'expected integer for course section'   
	  if(typeof attributes.start == 'undefined')
	    return 'expected course to have a start time'
	  if(typeof attributes.end == 'undefined')
	    return 'expected course to have a end time'
      //TODO: add ISO 8601 format check for start and end
	  //both are SQL timestamp type, YYYYMMDDTHHMMSS     
	  /*
	   Will's suggestions:
	  We take the string, split around the T 
	  and then can typecast to ints to verify they are sane.
		I.E. year > 19990000 && year < 20200000
	  No reason to worry about the format beyond YYYYMMDD
      other than maybe ensuring that month day combo is valid 
      Impossible for them to be interpreted in multiple ways based on mode. 
	  */ 
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
