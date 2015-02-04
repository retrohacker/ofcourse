var AddCourseParentView = Backbone.View.extend({
  defaultLocation: ".ofcourse-body",
  template: JADE.addCourse,
  initialize: function(opts) {
    this.setElement(this.template()),
    radio.on('unrender:AddCourseParentView', this.unrender, this)
    radio.on('render:AddCourseParentView',this.render,this)
    radio.on('unrender:page', this.unrender, this)
    radio.on('unrender', this.unrender, this)
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
