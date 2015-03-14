var CourseSearchChild_SingleCourseView = Backbone.View.extend({
  defaultLocation: ".oc-courses-courseContainer",
  template: JADE.userCoursesDiv,
  initialize: function(opts){
    var info = {title: this.model.get('title'),
                number: this.model.get('number'),
                section: this.model.get('section')
               }
    this.setElement(this.template(info))
    radio.on('unrender:CourseSearchChild_SingleCourseView', this.unrender, this)
    radio.on('render:UserCoursesChild_SingleCourseView', this.render, this)
    radio.on('unrender', this.unrender, this)
    radio.on('unrender:page', this.unrender, this)
  },
  events: {
    "click" : "onclick"
  },
  render: function(location) {
    var location = location || this.defaultLocation
    $(location).append(this.$el)
    return this;
  },
  unrender: function() {
    radio.off(null,null,this)
    this.$el.remove()
  },
  onclick: function() {
    App.userCourses.add(this.model)
    App.userCourses.save()
    console.log('Course Added')
    radio.trigger('open:course')
  }
});

