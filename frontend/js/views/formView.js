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
    radio.on('form submit',this.formSubmitted, this);
    var formVals = [];
  },
  render: function(collect, location) {
    //Create a JSON object from the passed collection
    formVals = collect.toJSON();
    //Send collection JSON to template to render form
    //with desired values
    this.template = JADE.regForm(formVals);
    //this.setElement(this.template);
    //Set the DOM element to be rendered in
    var location = location || this.defaultLocation
    //Add the view to the DOM
    $(location).append(this.template);
    return this;
  },
  formSubmitted: function(){
    var user = new User();
    jQuery.each(formVals, function(i, item){
      var name = document.getElementById(item.id).name;
      var value = document.getElementById(item.id).value;
      user.set(name, value);
    });
    //user.save();
    workspace.navigate('usr/home',{trigger: true});
  },
  unrender: function() {
    this.$el.remove();
  }
});