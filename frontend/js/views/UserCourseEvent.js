var UserCourseEventView = Backbone.View.extend({
  defaultLocation: ".oc-viewCourse-userCourseEventContainer",
  template: JADE.userCourseEvent,
  initialize: function(opts){
    var info = {title: this.model.get('title'), start: this.model.get('start'), end: this.model.get('end')}
    this.setElement(this.template(info))
    radio.on('unrender:userCourseEventView', this.unrender, this)
    radio.on('render:userCoursesEventView', this.render, this)
    radio.on('unrender', this.unrender, this)
    radio.on('unrender:page', this.unrender, this)
    return this;
  },
  render: function(location) {
    var location = location || this.defaultLocation
    $(location).append(this.$el)
    return this;
  },
  unrender: function() {
    radio.off(null,null,this)
    this.$el.remove()
  }
});
