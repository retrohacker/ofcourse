var UserAssignmentsView = Backbone.View.extend({
    defaultLocation: "body",
    template: JADE.userAssignments,
    initialize: function(opts){
      this.setElement(this.template())
      this.courses = opts.courses
      this.addAssign = false
      radio.on('unrender:userAssignmentsView', this.unrender, this)
      radio.on('render:userAssignmentsView', this.render, this)
      radio.on('refresh:userAssignmentsView', this.refresh, this)
      radio.on('unrender', this.unrender, this)
      radio.on('unrender:page', this.unrender, this)
      radio.on('addAssignment', this.addAssignment, this)
      this.listenTo(this.collection, 'add', this.refresh)
      this.listenTo(this.collection, 'remove', this.refresh)
      this.listenTo(this.collection, 'reset',this.refresh)
      return this
    },
    render: function(location) {
      var location = location || this.defaultLocation
      $(location).append(this.$el)
      this.renderInfo()
      return this
    },
    renderInfo: function() {
      var events = this.collection
      this.collection.each(function(model){
        if(model.get('type') == 1 && model.get('status') != 'COM')
          var info = new AssignmentInfoView({model: model, collection: events}).render()
      })
      return this
    },
    addAssignment: function(){
      var view = this
      if(!this.addAssign){
        $('.ofcourse-left').css({'transform': 'translateX(-50%)'})
        $('.ofcourse-right').css({'transform': 'translateX(+50%)'})
        $('.ofcourse-add-button').css({'transform': 'rotateZ(45deg)'})
        App.courses.fetch({
          success: function() {
            var addAssignmentView = new AddAssignView({radio: radio, collection: view.collection, courses: view.courses}).render()
            view.addAssign = true
          }
        })
      } else {
        radio.trigger('unrender:AddAssignView')
        $('.ofcourse-left').css({'transform': 'translateX(0%)'})
        $('.ofcourse-right').css({'transform': 'translateX(0%)'})
        $('.ofcourse-add-button').css({'transform': 'rotateZ(90deg)'})
        view.addAssign = false     
      }
      return this
    },
    refresh: function() {
      //this.unrender()
      radio.trigger('unrender:assignmentInfoView')
      this.renderInfo()
      //this.render()
      return this
    },
    unrender: function() {
      this.stopListening()
      radio.off(null, null, this)
      this.$el.remove()
      return this
    }
});

