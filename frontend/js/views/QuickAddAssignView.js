var QuickAddAssignView = Backbone.View.extend({
  defaultLocation: "body",
  template: JADE.quickAddAssign,
  initialize: function(opts){
    this.setElement(this.template())
    radio.on('unrender:QuickAddAssignView',this.unrender, this)
    radio.on('render:QuickAddAssignView',this.render,this)
    radio.on('unrender',this.unrender,this)
    radio.on('unrender:page',this.unrender,this)
  },
  render: function(location) {
    //Set the DOM element to be rendered in
    var location = location || this.defaultLocation
    //Add the view to the DOM
    $(location).append(this.$el)
    this.renderAddAssign()
    return this;
  },
  renderAddAssign: function() {
    var loadingView = new LoadingView({radio: radio, color: '#441D9E'}).render()
    var view = this
    App.courses.fetch({
      success: function() {
        var addAssignmentView = new AddAssignView({radio: radio,
                                                    collection: App.eventCollection,
                                                    courses: App.userCourses}).render()
        radio.trigger('unrender:LoadingView')
      }
    })
  },
  unrender: function() {
    this.stopListening()
    radio.off(null, null, this)
    this.$el.remove()
    return this
  }
});
