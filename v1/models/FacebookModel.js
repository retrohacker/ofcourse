var module = module || {}
var Backbone = Backbone || require('backbone')

var FacebookModel = module.exports = Backbone.Model.extend({
  validate:function(attr,opts) {
    //TODO
  }
})

module.exports.types = {
  fbid: "BIGINT PRIMARY KEY",
  access_token: "TEXT NOT NULL",
  id: "INT REFERENCES users(id)",
  link: "text",
  update_time: "VARCHAR(51)"
}

module.exports.tableName = "fb"
