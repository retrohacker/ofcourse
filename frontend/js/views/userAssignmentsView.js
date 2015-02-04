var UserAssignmentsView = Backbone.View.extend({
    defaultLocation: "body",
    template: JADE.userAssignments,
    initialize: function(opts){
      this.collection = opts.collection
      if(this.collection) {
        this.setElement(this.template(this.collection.toJSON()))
      }
      radio.on('unrender:userAssignmentsView', this.unrender, this)
      radio.on('render:userAssignmentsView', this.render, this)
      radio.on('unrender', this.unrender, this)
      radio.on('unrender:page', this.unrender, this)
      this.listenTo(this.collection, 'add', this.rerender)
      this.listenTo(this.collection, 'remove', this.rerender)
      this.listenTo(this.collection, 'reset',this.rerender)
    },
    completeAssignment: function(){
      //Delete from DB
    },
    render: function(location) {
      var location = location || this.defaultLocation
      $(location).append(this.$el)
      return this
    },
    unrender: function() {
      this.$el.remove()
      return this
    }
});

