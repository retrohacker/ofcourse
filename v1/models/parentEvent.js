var module = module || {}
var Backbone = Backbone || require('backbone')

var ParentEventModel = module.exports = Backbone.Model.extend({
  validate:function(attributes,options) {
    //TODO
  }
});

module.exports.tableName = "parent_events"
module.exports.types = {
  id: 'serial primary key',
  cid: 'integer references courses(id) not null',
  start: 'timestamp not null', //Start date time YYYY-MM-DD HH:MM:SS
  end: 'timestamp not null',   //End date time
  recurrence: 'text'           //unkown format... maybe json?
}
