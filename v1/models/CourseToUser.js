var module = module || {}
var Backbone = Backbone || require('backbone')

var CourseModel =  module.exports = Backbone.Model.extend({
  validate:function(attributes,options){
  }
})

module.exports.tableName = "course_user"
module.exports.types = {
  cid: 'integer references courses(id)',
  uid: 'integer references users(id)'
}
