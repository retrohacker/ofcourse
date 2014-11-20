var module = module || {}
var Backbone = Backbone || require('backbone')

var FacebookModel = module.exports = Backbone.Model.extend({
  validate:function(attr,opts) {
    //TODO
  }
})

module.exports.tableName = 'fb'
module.exports.types = {
  fbid: 'bigint primary key',
  access_token: 'text not null',
  id: 'int references users(id)',
  link: 'text not null',
  update_time: 'varchar(51) not null'
}
