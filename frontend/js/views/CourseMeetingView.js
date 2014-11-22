var CourseMeetingView = Backbone.View.extend({
  defaultLocation: ".oc-createCourse-courseMeetingContainer",
  template: JADE.courseMeeting,
  initialize: function(opts){
    this.setElement(this.template())
    radio.on('unrender:courseMeetingView', this.unrender, this)
    radio.on('render:courseMeetingView', this.render, this)
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
  },
  createEvent

});
