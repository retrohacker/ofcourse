var CourseSearchParentView = Backbone.View.extend({
  defaultLocation: '.ofcourse-body',
  template: JADE.courses,
  initialize: function(opts){
    this.setElement(this.template()),
    this.children = [],
    radio.on('unrender:CreateCourseParentView', this.unrender,this)
    radio.on('render:CreateCourseParentView', this.render,this)
    radio.on('unrender:page',this.unrender, this)
    radio.on('unrender', this.unrender,this)
  },
  render: function(location){
    var location = location || this.defaultLocation
    $(location).append(this.$el)
    this.createChildren()
    return this;
  },
  createChildren: function(){
    this.children.push()
    return this;
  },
  unrender: function() {
    this.$el.remove()
  }
});

