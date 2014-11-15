//User model
//This is data that will be stored in the database
var UserModel = Backbone.Model.extend({
  url: '/v1/user/user',
	defualts:{
  	url: '/v1/user/user',
		id: -1,
		firstName: 'First Name',
		lastName: 'Last Name',
		university: 'University',
		email: 'Email Address',
		courses: []
	},
	validate:function(attributes,options){
		console.log("VALIDATING")
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

