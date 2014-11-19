var UserCoursesContainerView = Backbone.View.extend({
    defaultLocation: ".oc-courses-pageWrapper",
    template: JADE.userCoursesContainer,
    initialize: function(opts){
      this.setElement(this.template())
      radio.on('unrender:userCourseContainer', this.unrender, this)
      radio.on('render:userCourseContainer', this.render, this)
      radio.on('unrender', this.unrender, this)
      radio.on('unrender:page', this.unrender)
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
        new UserCoursesDivView({model: this.collection.at(i)}).render()
      }
    },
    rerender: function() {
      radio.trigger('unrender:userCourseDivView')
      this.renderCourseViews()
    }
});

