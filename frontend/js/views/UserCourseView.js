var UserCourseView = Backbone.View.extend({
  defaultLocation: "body",
  template: JADE.userCourse,
  initialize: function(opts){
    radio.on('unrender:UserCourse',this.unrender,this)
    radio.on('render:UserCourse',this.render,this)
    radio.on('unrender',this.unrender,this)
    radio.on('unrender:page',this.unrender,this)
    radio.on('pass:CourseModel',this.openCourse,this)
  },
  render: function(location) {
    var location = location || this.defaultLocation
    $(location).append(this.$el)
    return this;
  },
  unrender: function() {
    this.$el.remove()
  },
  openCourse: function(model) {
    this.setElement(this.template(this.model))
  }
});
