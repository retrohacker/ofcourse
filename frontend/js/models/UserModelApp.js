//UserModelApp
//This model describes the logged in user
var UserModelApp = Backbone.Model.extend({
  url: '/v1/user/self',
  defaults: {},
  isLoggedIn: function() {
    return this.id != null
  },
  hasUniversity: function() {
    return this.university != null
  }
})
