var LoginView = Backbone.View.extend({
  defaultLocation: "body",
  initialize: function(){
    this.setElement(this.template())
    // Create temporary bypass button
    var button = document.createElement('button')
    this.$('.ofcourse-vcenter2').append(button)
    this.$('button').on('click',function() {
      workspace.navigate('home',{trigger:true})
    })
    // end button
    radio.on('unrender:LoginView',this.unrender, this)
    radio.on('render:LoginView',this.render,this)
    radio.on('unrender',this.unrender,this)
  },
  template: JADE.login,
  render: function(location) {
    var location = location || this.defaultLocation
    $(location).append(this.$el)
  },
  unrender: function(){
    this.$el.remove()
  }
});
