var CourseMeetingView = Backbone.View.extend({
  defaultLocation: ".oc-createCourse-courseMeetingContainer",
  template: JADE.courseMeeting,
  initialize: function(opts){
    this.setElement(this.template())
    radio.on('unrender:courseMeetingView', this.unrender, this)
    radio.on('render:courseMeetingView', this.render, this)
    radio.on('unrender', this.unrender, this)
    radio.on('unrender:page', this.unrender, this)
    radio.on('sendView:toCreateCourseView', this.sendView, this)
  },
  render: function(location) {
     var location = location || this.defaultLocation
     $(location).append(this.$el)
     return this;
  },
  formSubmitted: function(){
    var cid = ''
    var days = []
    jQuery.each(this.$('.day'), function(i, item){
      if(item.checked){
        days.push(item.value)
      }
    });
    var start = this.$('.startTime')
    console.log(start.val())
    console.log(days)
    /*var assignment = new EventModel({'courseid': this.courseId,
                                    'title': this.$('#title').val(),
                                    'desc': this.$('#desc').val(),
                                    'start': this.$('#due').val(),
                                    'end': this.$('#due').val(),
                                    'type': 1
                                  })
    assignment.save()
    workspace.navigate('home',{trigger: true})*/
  },
  sendView: function(){
    radio.trigger('courseSubmit', this)
  },
  unrender: function() {
    this.$el.remove()
  }


});
