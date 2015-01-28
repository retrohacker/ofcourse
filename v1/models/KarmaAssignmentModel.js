var module = module || {}
var Backbone = Backbone || require('backbone')
var module = module || {}
var Backbone = Backbone || require('backbone')

var KarmaAssignmentModel = module.exports = Backbone.Model.extend({
  validate:function(attributes,options) {
    //TODO
  }
});

module.exports.tableName = "karmatracker"
module.exports.types = {
  id: 'serial primary key',
  userid: 'integer references users(id) not null',
  courseid: 'integer references courses(id) not null',
  karma: 'integer not null',      // Eventually will be a real enumeration
}

/* Types:
 * 0: class
 * 1: assignment
 */
