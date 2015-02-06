var AddAssignView = Backbone.View.extend({
  defaultLocation: ".ofcourse-body",
  template: JADE.addAssignment,
  initialize: function(){
    this.setElement(this.template(this.collection.toJSON()))
    radio.on('unrender:AddAssignView',this.unrender, this)
    radio.on('render:AddAssignView',this.render,this)
    radio.on('unrender',this.unrender,this)
    radio.on('submit:AddAssign',this.submitted,this)
    radio.on('unrender:page',this.unrender,this)
    this.listenTo(this.collection, 'add', this.rerender)
    this.listenTo(this.collection, 'remove', this.rerender)
    this.listenTo(this.collection, 'reset',this.rerender)
  },
  render: function(location) {
    //Set the DOM element to be rendered in
    var location = location || this.defaultLocation
    //Add the view to the DOM
    $(location).append(this.$el)
    return this;
  },
  submitted: function(){
    var cid = ''
    jQuery.each(this.$('option'), function(i, item){
      if(item.selected){
        cid = item.id
      }
    });
    var assignment = new EventModel({'courseid': cid,
                                    'title': this.$('#title').val(),
                                    'desc': this.$('#desc').val(),
                                    'start': this.$('#due').val(),
                                    'end': this.$('#due').val(),
                                    'type': 1
                                  })
    assignment.save(null,{
      success: function(model,res,opts){
        workspace.navigate('userAssignments', {trigger: true})
      }
    })
  },
  rerender: function(){
    this.unrender()
    this.initialize()
    this.render()
  },
  unrender: function() {
    this.stopListening()
    radio.off(null, null, this)
    this.$el.remove()
  }
});
