//This is a view to be used with Forms collections
//and the *Form JADE templates.
//Instantiation: var variable = new FormView({radio:radio})
//Rendering: variable.render([Form Collection],[Optional DOM location])
var FormView = Backbone.View.extend({
  defaultLocation: "body",
  template: JADE.regForm,
  initialize: function(opts){
    this.formVals = opts.formVals || []
    this.setElement(this.template(this.formVals))
    radio.on('unrender:FormView',this.unrender, this)
    radio.on('render:FormView',this.render,this)
    radio.on('unrender',this.unrender,this)
    radio.on('form submit',this.formSubmitted, this)
  },
  render: function(location) {
    //Set the DOM element to be rendered in
    var location = location || this.defaultLocation
    //Add the view to the DOM
    $(location).append(this.$el)
    return this;
  },
  formSubmitted: function(){
    var user = new UserModel()
    var view = this
    jQuery.each(this.formVals, function(i, item){
      var name = view.$('#' + item.id).value
      var value = view.$('#' + item.id).value
      user.set(name, value)
    });
    //user.save();
    workspace.navigate('usr/uniSelect',{trigger: true})
  },
  unrender: function() {
    this.$el.remove()
  }
});
