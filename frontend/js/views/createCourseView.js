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
    this.events = []
    this.children = []
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
    this.createDatePicker()
    this.createChildren()
    return this;
  },
  formSubmitted: function(opts){
    var view = this
    this.children.forEach(function(v) {
      console.log(v.formSubmitted())
    })
    var events = this.children.map( function(v) { return v.formSubmitted()})
    console.log(events)
      
    jQuery.each(view.formVals, function(i, item){
      var name = item.name
      var value = view.$('#' + item.id).val()
      view.course.set(name, value)
    });
    this.course.save();
    //TODO: V add course to user's courses V
    // posy v1/users/id/course/id
  },
  getCourseId: function() {
    return this.course.get('id')
  },
  createDatePicker: function() {
    this.$('#start').datepicker()
    this.$('#end').datepicker()
  },
  createChildren: function(){
    this.children.push(new CourseMeetingView({radio:radio}))
  }, 
  unrender: function() {
    this.$el.remove()
  }
});
