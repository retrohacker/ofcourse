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
    radio.on('submit form',this.formSubmitted,this);
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
    $(location).append(this.template);
    return this;
  },
  events: {
    'submit form': 'formSubmitted'
  },
  formSubmitted: function(e){
    console.log("hi");
    e.preventDefault();
    var data = Backbone.Syphon.serialize(this);
    var user = new User();
    user.set(data);
    user.save();
    router.post('/v1/user/5555');
    console.log(user.toJSON());
    workspace.navigate('usr/home', {trigger: true});
    return false;
  },
  unrender: function() {
    this.$el.remove();
  }
});