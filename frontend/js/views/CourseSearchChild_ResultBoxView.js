var CourseSearchChild_ResultBoxView = Backbone.View.extend({
    defaultLocation: ".ofcourse-body",
    template: JADE.userCoursesContainer,
    initialize: function(opts){
      this.setElement(this.template()),
      radio.on('unrender:CourseSearchChild_ResultBoxView', this.unrender, this)
      radio.on('render:CourseSearchChild_ResultBoxView', this.render, this)
      radio.on('unrender', this.unrender, this)
      radio.on('unrender:page', this.unrender, this)
      radio.on('rerender:CourseSearchChild_ResultBoxView', this.rerender, this)

      this.children = []
      this.listenTo(this.collection, 'add', this.rerender)
      this.listenTo(this.collection, 'remove', this.rerender)
      this.listenTo(this.collection, 'reset', this.rerender)
      this.listenTo(this.collection, 'update', this.rerender)

      radio.on('upDateSearchCollection',this.rerender,this)
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
      console.log("children rendered");
      console.log("collection length ", this.collection.length)
      for(var i = 0; i < this.collection.length; i++){
        console.log(this.collection.at(i));
        new CourseSearchChild_SingleCourseView({model: this.collection.at(i)}).render()
      }
      return this
    },
    rerender: function(collection) {
      this.collection = collection;
      console.log("rerender triggered ", collection);
      radio.trigger('unrender:CourseSearchChild_SingleCourseView')
      this.createAndRenderChildren()
      return this
    }
});

