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
    this.course = new CourseModel({radio:radio});
    radio.on('unrender:FormView',this.unrender, this)
    radio.on('render:FormView',this.render,this)
    radio.on('unrender',this.unrender,this)
    radio.on('unrender:page',this.unrender,this)
    radio.on('createCourse',this.formSubmitted, this)
  },
  render: function(location) {
    //Set the DOM element to be rendered in
    var location = location || this.defaultLocation
    //Add the view to the DOM
    $(location).append(this.$el)
    return this;
  },
  formSubmitted: function(){
    console.log('createCourseView.js: formVals: ',this.formVals)
    var view = this
    jQuery.each(view.formVals, function(i, item){
      var name = item.name
      var value = view.$('#' + item.id).val()
      console.log('createCourseView.js: name: ', name)
      console.log('createCourseView.js: value: ', value)
      view.course.set(name, value)
    });
    console.log('createCourseView.js: ', this.course)
    this.course.save();
    //TODO: V add course to user's courses V
    //this.user.set({'courses' : userCourses})
    //this.user.save()
  },
  unrender: function() {
    this.$el.remove()
  }
});
