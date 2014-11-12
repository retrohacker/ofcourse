var UniSelectView = Backbone.View.extend({
  defaultLocation: "body",
  template: JADE.uniSelect,
  initialize: function(opts){
    this.universities = opts.universities || []
    this.user = opts.user
    this.setElement(this.template(this.universities))
    radio.on('unrender:UniSelect',this.unrender, this)
    radio.on('render:UniSelect',this.render,this)
    radio.on('unrender',this.unrender,this)
    radio.on('submit:University',this.submitted,this)
  },
  render: function(location) {
    //Set the DOM element to be rendered in
    var location = location || this.defaultLocation
    //Add the view to the DOM
    $(location).append(this.$el)
    return this;
  },
  submitted: function(options){
    var university = options
    this.user.set({university: university})
    this.user.save();
    workspace.navigate('usr/home',{trigger: true})
  },
  unrender: function() {
    this.$el.remove()
  }
});