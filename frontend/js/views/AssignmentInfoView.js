var AssignmentInfoView = Backbone.View.extend({
    defaultLocation: ".ofcourse-module-full.ofcourse-mcolor-white.assignments",
    template: JADE.assignmentInfo,
    initialize: function(opts){
      this.setElement(this.template(this.model.toJSON()))
      radio.on('unrender:assignmentInfoView', this.unrender, this)
      radio.on('unrender:assignmentInfoView' + this.model.id, this.unrender, this)
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
      var model = this.model.id
      this.model.save(null,{
        success: function(model,res,opts){
          radio.trigger('unrender:assignmentInfoView' + model.id)
        }
      })
    },
    unrender: function() {
      radio.off(null, null, this)
      this.$el.remove()
      return this
    }
});

