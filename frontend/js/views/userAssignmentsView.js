var UserAssignmentsView = Backbone.View.extend({
    defaultLocation: "body",
    template: JADE.userAssignments,
    initialize: function(opts){
      this.setElement(this.template())
      radio.on('unrender:userAssignmentsView', this.unrender, this)
      radio.on('render:userAssignmentsView', this.render, this)
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
    },
    addAssignment: function(){
      workspace.navigate('addAssignment',{trigger: true})
    },
    refresh: function() {
      radio.trigger('unrender:assignmentInfoView')
      this.renderInfo()
    },
    unrender: function() {
      this.stopListening()
      radio.off(null, null, this)
      this.$el.remove()
      console.log("unrender")
      return this
    }
});

