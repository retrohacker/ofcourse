//NOTE: This file exists as a symbolic link in frontend/js/models
var Backbone = Backbone || require('backbone')

//User model
//This is data that will be stored in the database
var UserModel = Backbone.Model.extend({
  url: '/v1/user',
  validate:function(attributes,options){
	if(attributes.id && (typeof attributes.id != 'number' || attributes.id < 0))
      return 'expected number for id'
    if(typeof attributes.firstName != 'string')
      return 'expected string for firstName'
	if(typeof attributes.lastName != 'string')
      return 'expected string for lastName'
	 //if(attributes.university && typeof attributes.university != 'string')
      //return 'expected string for university'
    if(attributes.email && typeof attributes.email != 'string')
      return 'expected string for email'
    if(attributes.email){
      var re = new RegExp("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")
      if(typeof attributes.email != 'string' || !attributes.email.match(re))
        return 'email not valid error'
    }
  },
  isLoggedIn: function() {
    return this.attributes.id != null
  },
  hasUniversity: function() {
    return this.attributes.university != null
  }
});

UserModel.tableName = "users"
UserModel.types = {
  id: 'serial primary key',
  firstName: 'varchar (50) not null',
  lastName: 'varchar(50) not null',
  university: 'integer references universities(id)',
  email: 'varchar(254) unique'
}

if(typeof module !== 'undefined' && module.exports) {
  module.exports = UserModel
}
