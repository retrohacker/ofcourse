// This is the view for each individual course at a university to be displayed on the add Course page
var AddCourseChild_SingleCourseView = Backbone.View.extend({
  defaultLocation: ".oc-addcourse-courseContainer",
  template: JADE.courseDiv,
  initialize: function(opts){
    var info = {id: this.model.get('id'),title: this.model.get('title'), number: this.model.get('number')} 
    this.setElement(this.template(info))
    radio.on('unrender:AddCourseChid_SingleCourseView', this.unrender, this)
    radio.on('render:AddCourseChild_SingleCourseView', this.render, this)
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
