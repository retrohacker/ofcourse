var AddAssignView = Backbone.View.extend({
  defaultLocation: ".oc-userAssignments-pageWrapper.ofcourse-body",
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
    var inputTime = this.$('#due').val()
    console.log(inputTime)
    

    var timeArr = inputTime.split(/[a-zA-Z]/);

    var date = new Date(timeArr[0] + " " + timeArr[1])
    console.log(date)
    var isoTime = date.toISOString()
    console.log(isoTime)
    var assignment = new EventModel({'courseid': cid,
                                    'title': this.$('#title').val(),
                                    'desc': this.$('#desc').val(),
                                    'start': isoTime,
                                    'end': isoTime,
                                    'type': 1
                                  })
    console.log(assignment)
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
