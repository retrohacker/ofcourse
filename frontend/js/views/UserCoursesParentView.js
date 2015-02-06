var UserCoursesParentView = Backbone.View.extend({
  defaultLocation: ".ofcourse-body",
  template: JADE.courses,
  initialize: function(opts){
    this.setElement(this.template(this.collection)),
    this.children = [],
    
    radio.on('unrender:UserCoursesParentView',this.unrender,this)
    radio.on('render:UserCoursesParentView',this.render,this)
    radio.on('unrender',this.unrender,this)
    radio.on('unrender:page',this.unrender,this)
    radio.on('open:course',this.openCourse,this)
  },
  render: function(location) {
    var location = location || this.defaultLocation
    $(location).append(this.$el)
    this.createChildren()
    return this;
  },
  createChildren: function(){
    this.children.push(new UserCoursesChild_CoursesContainerView({radio: radio,
                                                                  collection: this.collection,
                                                                 }).render()
      )
      return this
  },
  unrender: function() {
    this.$el.remove()
  },
  openCourse: function() {
    workspace.navigate('viewCourse',{trigger:true})
  }
});
