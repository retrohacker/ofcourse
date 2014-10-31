//This is a model used for JADE template user input forms
//Store instantiate and store Entry models in a Forms collection
//and pass into a JADE form template as JSON
var Entry = Backbone.Model.extend({
	defaults:{
		id: '',
    desc: '',
    name: ''
	}
});


