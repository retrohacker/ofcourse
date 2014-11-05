//User model
//This is data that will be stored in the database
<<<<<<< HEAD
var User = Backbone.Model.extend({
  url: '/v1/user/5555',
=======
var UserModel = Backbone.Model.extend({
>>>>>>> a4c5f3d628c282e9a66d0c09310ec4aaf08557ee
	defualts:{
		id: -1,
		firstName: 'First Name',
		lastName: 'Last Name',
		university: 'University',
		email: 'Email Address'
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
	}
});

