var UniCourseContainerView = Backbone.View.extend({
  defaultLocation: ".oc-addCourse-pageWrapper",
  template: JADE.uniCourseContainer,
  initialize: function(opts){
    this.user = opts.user || []
    this.setElement(this.template())
    radio.on('unrender:uniCourseContainer', this.unrender, this)
    radio.on('render:uniCourseContainer', this.render, this)
    radio.on('unrender', this.unrender, this)
    radio.on('unrender:page', this.unrender, this)
    radio.on('addClass', this.addClass,this)
    this.listenTo(this.collection, 'add', this.rerender)
    this.listenTo(this.collection, 'remove', this.rerender)
    this.listenTo(this.collection, 'reset', this.rerender)
  },
  addClass: function(course) {
   /* var userCourses = this.model.get('courses')
    if(typeof userCourses == 'undefined'){
      userCourses = [course]
    }else{
      userCourses.push(course)
    }
    this.model.set({'courses' : userCourses})
    this.model.save()*/

    //This needs to be reworked
    //Todo: associate cousre with user
  },
  render: function(location) {
    var location = location || this.defaultLocation
    $(location).append(this.$el)
    this.renderCourseViews()
    return this;
  },
  unrender: function() {
    this.$el.remove()
    return this
  },
  renderCourseViews: function (){
    for(var i = 0; i < this.collection.length; i++){
      new CourseView({model: this.collection.at(i)}).render()
    }
  },
  rerender: function () {
    radio.trigger('unrender:courseView')
    this.renderCourseViews()
  }
});
