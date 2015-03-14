var CourseSearchChild_ResultBoxView = Backbone.View.extend({
    defaultLocation: ".ofcourse-body",
    template: JADE.userCoursesContainer,
    initialize: function(opts){
      this.setElement(this.template()),
      radio.on('unrender:CourseSearchChild_ResultBoxView', this.unrender, this)
      radio.on('render:UserCoursesChild_CoursesContainerView', this.render, this)
      radio.on('unrender', this.unrender, this)
      radio.on('unrender:page', this.unrender, this)

      this.children = []
      this.listenTo(this.collection, 'add', this.rerender)
      this.listenTo(this.collection, 'remove', this.rerender)
      this.listenTo(this.collection, 'reset', this.rerender)
    },
    render: function(location) {
      var location = location || this.defaultLocation
      $(location).append(this.$el)
      this.createAndRenderChildren()
      return this;
    },
    unrender: function() {
      this.$el.remove()
      return this
    },
    createAndRenderChildren: function (){
      for(var i = 0; i < this.collection.length; i++){
        new CourseSearchChild_SingleCourseView({model: this.collection.at(i)}).render()
      }
      return this
    },
    rerender: function() {
      radio.trigger('unrender:CourseSearchChild_SingleCourseView')
      this.createAndRenderChildren()
      return this
    }
});

