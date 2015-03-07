var LoadingView = Backbone.View.extend({
  defaultLocation: ".ofcourse-load-container",
  template: JADE.loading,
  initialize: function(opts){
    this.setElement(this.template())
    this.color = opts.color || 'WHITE'
    radio.on('unrender:LoadingView',this.unrender, this)
    radio.on('render:LoadingView',this.render,this)
    radio.on('unrender',this.unrender,this)  },
  render: function(location) {
    //Set the DOM element to be rendered in
    var location = location || this.defaultLocation
    //Add the view to the DOM
    $(location).append(this.$el)
    this.$el.css({'color': this.color})
    return this
  },
  unrender: function() {
    this.stopListening()
    radio.off(null, null, this)
    this.$el.remove()
    return this
  }
});