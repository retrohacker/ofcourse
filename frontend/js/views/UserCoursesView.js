var UserCoursesView = Backbone.View.extend({
  defaultLocation: "body",
  template: JADE.courses,
  initialize: function(opts){
    this.setElement(this.template(this.collection))
    radio.on('unrender:UserCourses',this.unrender,this)
    radio.on('render:UserCourses',this.render,this)
    radio.on('unrender',this.unrender,this)
    radio.on('unrender:page',this.unrender,this)
    radio.on('open:course',this.openCourse,this)
  },
  render: function(location) {
    var location = location || this.defaultLocation
    $(location).append(this.$el)
    return this;
  },
  unrender: function() {
    this.$el.remove()
  },
  openCourse: function() {
    workspace.navigate('viewCourse',{trigger:true})
  }
});
