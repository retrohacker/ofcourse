//This is a view to be used with Forms collections
//and the *Form JADE templates. 
//Instantiation: var variable = new FormView({radio:radio})
//Rendering: variable.render([Form Collection],[Optional DOM location])
var FormView = Backbone.View.extend({
  defaultLocation: "body",
  initialize: function(){
    //Attach radio
    radio.on('unrender:FormView',this.unrender, this);
    radio.on('render:FormView',this.render,this);
    radio.on('unrender',this.unrender,this);
    //radio.on('form submit',this.formSubmitted('form submit'),this);
  },
  render: function(collect, location) {
    //Create a JSON object from the passed collection
    var formVals = collect.toJSON();
    //Send collection JSON to template to render form
    //with desired values
    this.template = JADE.regForm(formVals);
    this.setElement(this.template);
    //Set the DOM element to be rendered in
    var location = location || this.defaultLocation
    //Add the view to the DOM
    $(location).append(this.$el);
    return this;
  },
  //events: {
  //  'form submit': 'formSubmitted'
  //},
  formSubmitted: function(e){
    //e.preventDefault();
    console.log("hi");
    var data = Backbone.Syphon.serialize(this);
    console.log(data);
    var user = new User();
    user.set(data);
    user.save();
    workspace.navigate('usr/home', {trigger: true});
  },
  unrender: function() {
    this.$el.remove();
  }
});