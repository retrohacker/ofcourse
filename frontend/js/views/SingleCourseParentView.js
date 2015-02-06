var SingleCourseParentView = Backbone.View.extend({
  defaultLocation: ".ofcourse-body",
  template: JADE.userCourse,
  initialize: function(opts){
    this.info = {title: this.model.get('title'),
                 section: this.model.get('section'),
                 number: this.model.get('number')}
    this.setElement(this.template(this.info))
    this.children = []
    radio.on('unrender:SingleCourseParentView',this.unrender,this)
    radio.on('render:SingleCourseParentView',this.render,this)
    radio.on('unrender',this.unrender,this)
    radio.on('unrender:page',this.unrender,this)
  },
  render: function(location) {
    var location = location || this.defaultLocation
    $(location).append(this.$el)
    this.createChildren()
    return this;
  },
  createChildren: function(){
    this.children.push(new SingleCourseChild_CourseEventsContainerView({radio: radio,
                                           model: this.model,
                                           collection: this.collection
                                          }).render())
  },
  unrender: function() {
    radio.off(null,null,this)
    this.$el.remove()
  }
});
