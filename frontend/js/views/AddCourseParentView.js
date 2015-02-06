var AddCourseParentView = Backbone.View.extend({
  defaultLocation: ".ofcourse-body",
  template: JADE.addCourse,
  initialize: function(opts) {
    this.setElement(this.template()),
    this.children = [],
    radio.on('unrender:AddCourseParentView', this.unrender, this)
    radio.on('render:AddCourseParentView',this.render,this)
    radio.on('unrender:page', this.unrender, this)
    radio.on('unrender', this.unrender, this)
  },
  render: function(location) {
    var location = location || this.defaultLocation
    $(location).append(this.$el)
    this.createChildren()
    return this;
  },
  createChildren: function(){
    this.children.push(new AddCourseChild_CourseContainerView({radio: radio,
                                                               collection: this.collection,
                                                               model: this.model
                                                              }).render()
    )
    return this;
  },
  unrender: function() {
    this.$el.remove()
  }
   
});
