var module = module || {}
var Backbone = Backbone || require('backbone')

//User model
//This is data that will be stored in the database
var UserModel = module.exports = Backbone.Model.extend({
  defaults:{
  },
  validate:function(attributes,options){
	  if(typeof attributes.id != 'number')
      return 'expected number for id'
    if(typeof attributes.firstName != 'string')
      return 'expected string for firstName'
	  if(typeof attributes.lastName != 'string')
      return 'expected string for lastName'
	  if(typeof attributes.university != 'string')
      return 'expected string for university'
    if(typeof attributes.email != 'string')
      return 'expected string for email'
    if(attributes.id < 0){
      return 'id error'
    }
    if(attributes.email){
      var re = new RegExp("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")
      if(typeof attributes.email != 'string' || !attributes.email.match(re))
        return 'email not valid error'
    }
  }
});

module.exports.types = {
  id: 'SERIAL PRIMARY KEY',
  firstName: 'VARCHAR(50) NOT NULL',
  lastName: 'VARCHAR(50) NOT NULL',
  university: 'VARCHAR(50)',
  email: 'VARCHAR(254)'
}

module.exports.tableName = "users"
