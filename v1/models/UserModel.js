var module = module || {}
var Backbone = Backbone || require('backbone')

//User model
//This is data that will be stored in the database
var UserModel = module.exports = Backbone.Model.extend({
  validate:function(attributes,options){
	  if(attributes.id && (typeof attributes.id != 'number' || attributes.id < 0))
      return 'expected number for id'
    if(typeof attributes.firstName != 'string')
      return 'expected string for firstName'
	  if(typeof attributes.lastName != 'string')
      return 'expected string for lastName'
	  if(attributes.university && typeof attributes.university != 'string')
      return 'expected string for university'
    if(typeof attributes.email != 'string')
      return 'expected string for email'
    if(attributes.email){
      var re = new RegExp("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")
      if(typeof attributes.email != 'string' || !attributes.email.match(re))
        return 'email not valid error'
    }
  }
});

module.exports.tableName = "users"
module.exports.types = {
  id: 'serial primary key',
  firstName: 'varchar (50) not null',
  lastName: 'varchar(50) not null',
  university: 'integer references universities(id)',
  email: 'varchar(254)'
}
