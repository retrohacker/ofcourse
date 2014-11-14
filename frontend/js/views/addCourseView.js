var AddCourseView = Backbone.View.extend({
  defaultLocation: "body",
  template: JADE.addCourse,
  initialize: function(opts) {
    this.setElement(this.template()),
    radio.on('unrender:AddCourse', this.unrender, this)
    radio.on('render:AddCourse',this.render,this)
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
