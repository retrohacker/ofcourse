var AssignmentInfoView = Backbone.View.extend({
    defaultLocation: ".oc-userAssignments-list",
    template: JADE.assignmentInfo,
    initialize: function(opts){
      this.collection = opts.collection
      this.setElement(this.template(this.model.toJSON()))
      radio.on('unrender:assignmentInfoView', this.unrender, this)
      radio.on('render:assignmentInfoView', this.render, this)
      radio.on('unrender', this.unrender, this)
      radio.on('unrender:page', this.unrender, this)
      radio.on('submit:completeAssignment' + this.model.id, this.completeAssignment, this)
    },
    render: function(location) {
      var location = this.defaultLocation
      $(location).append(this.$el)
      return this
    },
    completeAssignment: function(){
      this.model.set("status", "COM")
      this.model.save()
      this.unrender
    },
    unrender: function() {
      this.$el.remove()
      return this
    }
});

