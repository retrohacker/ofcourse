//Models
var Entry = Backbone.Model.extend({
	defaults:{
		val: ''
	}
});

var Forms = Backbone.Collection.extend({
	model: Entry
});

var firstName = new Entry({val:"fname"});
var lastName = new Entry({val:"lname"});
var University = new Entry({val:"university"});
var emailAddress = new Entry({val:"email"});

var regFields = new Forms([
	firstName,
	lastName,
	University,
	emailAddress
]);