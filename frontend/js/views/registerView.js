
var FormView = Backbone.View.extend({
	initialize: function(){
		var formVals = JSON.stringify(this.model);
		this.template = JADE.regForm(this.model);
		this.render();
	},
	render: function() {
		var html = this.template;
		this.$el.append(html);
		return this;
	}
});

var regView = new FormView({
	el: "body",
	model: firstName
});
regView.render();