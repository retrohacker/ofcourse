var AddAssignView = Backbone.View.extend({
  defaultLocation: ".ofcourse-module-full.ofcourse-mcolor-white.add",
  template: JADE.addAssignment,
  initialize: function(opts){
    this.setElement(this.template(opts.courses.toJSON()))
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
    this.createDatePicker()
    return this;
  },
  submitted: function(){
    var cid = ''
    var view = this
    jQuery.each(this.$('option'), function(i, item){
      if(item.selected){
        cid = item.id
      }
    });
    var utc = new Date()
    var offset = utc.toString().slice(28,29)
    if(offset == '-')
      var dueDateTime = new Date(utc.getTime() - (utc.getTimezoneOffset() * 60000)).toISOString().slice(0,19)
    else
      var dueDateTime = new Date(utc.getTime() + (utc.getTimezoneOffset() * 60000)).toISOString().slice(0,19)
    if(this.$('#due').val() != '')
      dueDateTime = this.$('#due').val()
    console.log(dueDateTime)
    var assignment = new EventModel({'courseid': cid,
                                    'title': this.$('#title').val(),
                                    'desc': this.$('#desc').val(),
                                    'start': dueDateTime,
                                    'end': dueDateTime,
                                    'type': 1
                                  })
    assignment.save(null,{
      success: function(){
        view.collection.add(assignment)
      }
    })
    radio.trigger('addDisable')
    $('.ofcourse-left').css({'transform': 'translateX(0%)'})
    $('.ofcourse-right').css({'transform': 'translateX(0%)'})
    this.unrender()
    return this
  },
  createDatePicker: function() {
    this.$('#due').datetimepicker({
      format:'Y-m-d H:i:s',
      inline:true
    })
  },
  rerender: function(){
    this.unrender()
    this.initialize()
    this.render()
    return this
  },
  unrender: function() {
    this.stopListening()
    radio.off(null, null, this)
    this.$el.remove()
    return this
  }
});
