var LoginView = Backbone.View.extend({
  defaultLocation: "body",
	initialize: function(){
		radio.on('unrender:LoginView',this.unrender, this)
    radio.on('render:LoginView',this.render,this)
    radio.on('unrender',this.unrender,this)
	},
	render: function(location) {
    var location = location || this.defaultLocation
    this.$el.html(JADE.login())
    $(location).append(this.$el)
  },
	unrender: function(){
		console.log('shit buckets')
    this.$el.empty()
	}
});
