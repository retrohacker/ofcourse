//NOTE: This file exists as a symbolic link in frontend/js/models
var Backbone = Backbone || require('backbone')

var EventModel = Backbone.Model.extend({
  url: '/v1/event/event',
  validate:function(attributes,options) {
	  if(typeof attributes.id != 'number')
		return 'expected number for id'
      if(attributes.id < 0)
      	return 'expected event id to be greater than 0'
      if(typeof attributes.userid != 'number')
		return 'expected number for userid'
	  if(typeof attributes.courseid != 'number')
		return 'expected number for courseid'
	  if(typeof attributes.title == 'undefined')
	    return 'expected event to have a title'
	  if(attributes.title.length > 150)
		return 'course title is too long. 50 chars max.'  
	  if(typeof attributes.start == 'undefined')
	    return 'expected event to have a start time'
	  if(typeof attributes.end == 'undefined')
	    return 'expected event to have a end time'
	  if(typeof attributes.type != 'number')
		return 'expected number for type'
	  //TODO: add validation for data and status
      //TODO: add ISO 8601 format check for start and end
  }
});

EventModel.tableName = "events"
EventModel.types = {
  id: 'serial primary key',
  userid: 'integer references users(id) not null',
  parentid: 'integer references parent_events(id)',
  courseid: 'integer references courses(id) not null',
  title: 'varchar(150) not null',//Event title on the calendar
  start: 'timestamp with time zone not null',   //Start date time YYYY-MM-DD HH:MM:SS
  end: 'timestamp with time zone not null',     //End date time
  type: 'integer not null',      // Eventually will be a real enumeration
  data: 'text',                   //json object
  status: 'text'
}

/* Types:
 * 0: class
 * 1: assignment
 */
if(typeof module !== 'undefined' && module.exports) {
  module.exports = EventModel
}
