//This is a view to be used with Forms collections
//and the *Form JADE templates.
//Instantiation: var variable = new FormView({radio:radio})
//Rendering: variable.render([Form Collection],[Optional DOM location])
var LoginView = Backbone.View.extend({
  defaultLocation: "body",
  template: JADE.login,
  initialize: function(opts){
    this.formVals = opts.formVals || []
    this.setElement(this.template(this.formVals))
    radio.on('unrender:LoginView',this.unrender, this)
    radio.on('render:LoginView',this.render,this)
    radio.on('unrender',this.unrender,this)
  },
  render: function(location) {
    //Set the DOM element to be rendered in
    var location = location || this.defaultLocation
    //Add the view to the DOM
    $(location).append(this.$el)
    return this;
  },
  unrender: function() {
    this.$el.remove()
  }
});