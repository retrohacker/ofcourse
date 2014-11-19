var UserCoursesDivView = Backbone.View.extend({
  defaultLocation: ".oc-userCourses-courseContainer",
  template: JADE.userCoursesDiv,
  initialize: function(opts){
    var info = {title: this.model.get('title'), number: this.model.get('number'), section: this.model.get('section')}
    this.setElement(this.template(info))
    radio.on('unrender:userCourseDivView', this.unrender, this)
    radio.on('render:userCoursesDivView', this.render, this)
    radio.on('unrender', this.unrender, this)
    radio.on('unrender:page', this.unrender, this)
  },
  render: function(location) {
    var location = location || this.defaultLocation
    $(location).append(this.$el)
    return this;
  },
  unrender: function() {
    this.$el.remove()
  }
});

