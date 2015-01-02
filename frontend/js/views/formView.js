//This is a view to be used with Forms collections
//and the *Form JADE templates.
//Instantiation: var variable = new FormView({radio:radio})
//Rendering: variable.render([Form Collection],[Optional DOM location])
var FormView = Backbone.View.extend({
  defaultLocation: ".ofcourse-body",
  template: JADE.regForm,
  initialize: function(opts){
    this.formVals = opts.formVals || []
    this.user = opts.user//is this line necessary?
    this.setElement(this.template(this.formVals))
    radio.on('unrender:FormView',this.unrender, this)
    radio.on('render:FormView',this.render,this)
    radio.on('unrender',this.unrender,this)
    radio.on('formSubmit',this.formSubmitted, this)
    radio.on('unrender:page',this.unrender, this)
  },
  render: function(location) {
    //Set the DOM element to be rendered in
    var location = location || this.defaultLocation
    //Add the view to the DOM
    $(location).append(this.$el)
    return this;
  },
  formSubmitted: function(){
    var view = this
    jQuery.each(view.formVals, function(i, item){
      var name = item.name
      var value = view.$('#' + item.id).val()
      view.user.set(name, value)
    });
    this.user.save();
    workspace.navigate('home',{trigger: true})
  },
  unrender: function() {
    this.$el.remove()
  }
});
