//User model
//This is data that will be stored in the database
var User = Backbone.Model.extend({
  url: '/v1/user/5555',
	defualts:{
		firstName: 'First Name',
		lastName: 'Last Name',
		university: 'University',
		email: 'Email Address'
	}
});