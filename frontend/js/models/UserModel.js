//User model
//This is data that will be stored in the database
var UserModel = Backbone.Model.extend({
  url: '/v1/user',
	defualts:{
		firstName: 'First Name',
		lastName: 'Last Name',
		university: 'University',
		email: 'Email Address',
    karma: 0,
  },
	validate:function(attributes,options){
		if(attributes.id < 0){
			return 'id error'
		}
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

