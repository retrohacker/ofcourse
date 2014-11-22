var UniSelectView = Backbone.View.extend({
  defaultLocation: "body",
  template: JADE.uniSelect,
  initialize: function(){
    //this.collection.bind('reset', this.rerender);
    this.setElement(this.template(App.universityCollection.toJSON()))
    radio.on('unrender:UniSelect',this.unrender, this)
    radio.on('render:UniSelect',this.render,this)
    radio.on('unrender',this.unrender,this)
    radio.on('submit:University',this.submitted,this)
    radio.on('unrender:page',this.unrender,this)
  },
  render: function(location) {
    //Set the DOM element to be rendered in
    var location = location || this.defaultLocation
    //Add the view to the DOM
    $(location).append(this.$el)
    return this;
  },
  submitted: function(options){
    var university = options//options is the university ID, passed from uniSelect.jade
    App.user.set({university: university})
    App.user.save();
    workspace.navigate('home',{trigger: true})
  },
  unrender: function() {
    this.$el.remove()
  }
});
