var UserCoursesChild_CoursesContainerView = Backbone.View.extend({
    defaultLocation: ".oc-courses-pageWrapper",
    template: JADE.userCoursesContainer,
    initialize: function(opts){
      this.setElement(this.template()),
      radio.on('unrender:UserCoursesChild_CoursesContainerView', this.unrender, this)
      radio.on('render:UserCoursesChild_CoursesContainerView', this.render, this)
      radio.on('unrender', this.unrender, this)
      radio.on('unrender:page', this.unrender, this)
      this.listenTo(this.collection, 'add', this.rerender)
      this.listenTo(this.collection, 'remove', this.rerender)
      this.listenTo(this.collection, 'reset', this.rerender)
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
        new UserCoursesChild_SingleCourseView({model: this.collection.at(i)}).render()
      }
    },
    rerender: function() {
      radio.trigger('unrender:UserCoursesChild_SingleCourseView')
      this.renderCourseViews()
    }
});

