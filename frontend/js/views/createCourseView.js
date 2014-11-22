//This is a view to be used with Forms collections
//and the *Form JADE templates.
//Instantiation: var variable = new FormView({radio:radio})
//Rendering: variable.render([Form Collection],[Optional DOM location])
var CreateCourseView = Backbone.View.extend({
  defaultLocation: "body",
  template: JADE.createCourseForm,
  initialize: function(opts){
    this.formVals = opts.formVals || [] 
    this.setElement(this.template(this.formVals))
    this.course = new CourseModel();
    radio.on('unrender:FormView',this.unrender, this)
    radio.on('render:FormView',this.render,this)
    radio.on('unrender',this.unrender,this)
    radio.on('unrender:page',this.unrender,this)
    radio.on('courseSubmit',this.formSubmitted, this)
  },
  render: function(location) {
    //Set the DOM element to be rendered in
    var location = location || this.defaultLocation
    //Add the view to the DOM
    $(location).append(this.$el)
    return this;
  },
  formSubmitted: function(){
    this.course = new CourseModel()
    var view = this
    jQuery.each(view.formVals, function(i, item){
      var name = item.name
      var value = view.$('#' + item.id).val()
      view.course.set(name, value)
    });    this.course.save();
    //TODO: V add course to user's courses V
    // posy v1/users/id/course/id
  },
  unrender: function() {
    this.$el.remove()
  }
});
