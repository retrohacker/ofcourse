var module = module || {}
var Backbone = Backbone || require('backbone')

var EventModel = Backbone.Model.extend({
  validate:function(attributes,options) {
    //TODO
  }
});

module.exports.tableName = "events"
module.exports.types = {
  id: 'serial primary key',
  userid: 'integer references users(id) not null',
  parentid: 'integer references parent_events(id) not null',
  courseid: 'integer references courses(id) not null',
  title: 'varchar(150) not null',//Event title on the calendar
  start: 'timestamp not null',   //Start date time YYYY-MM-DD HH:MM:SS
  end: 'timestamp not null',     //End date time
  type: 'integer not null',      // Eventually will be a real enumeration
  data: 'text'                   //json object
}

/* Types:
 * 0: class
 * 1: assignment
 */
