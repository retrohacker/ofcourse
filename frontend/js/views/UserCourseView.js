var UserCourseView = Backbone.View.extend({
  defaultLocation: "body",
  template: JADE.userCourse,
  initialize: function(opts){
    this.info = {title: this.model.get('title'), section: this.model.get('section'), number: this.model.get('number')}
    this.setElement(this.template(this.info))
    radio.on('unrender:UserCourse',this.unrender,this)
    radio.on('render:UserCourse',this.render,this)
    radio.on('unrender',this.unrender,this)
    radio.on('unrender:page',this.unrender,this)
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
