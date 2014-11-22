var CourseMeetingView = Backbone.View.extend({
  defaultLocation: ".oc-createCourse-courseMeetingContainer",
  template: JADE.courseMeeting,
  initialize: function(opts){
    console.log(this)
    this.setElement(this.template())
    this.formSubmitted = this.generateGetEvent(this)
    radio.on('unrender:courseMeetingView', this.unrender, this)
    radio.on('render:courseMeetingView', this.render, this)
    radio.on('unrender', this.unrender, this)
    radio.on('unrender:page', this.unrender, this)
  },
  render: function(location) {
     var location = location || this.defaultLocation
     $(location).append(this.$el)
     return this;
  },
  generateGetEvent: function(obj) {
    console.log(obj)
    return function() {
      return obj.getEvent(obj)
    }
  },
  getEvent: function(obj){
    console.log(obj)
    var cid = ''
    var wdString = ''
    $.each(obj.$('.day'), function(i, item){
      var item = $(item)
      if(item.prop('checked')){
       wdString = wdString + item.val() + ','
      }
    });
    wdString = wdString.substring(0, wdString.length-1)
    console.log(obj.$('.startTime'))
    mestart = starttime = obj.$('.startTime').val().split(':')
    meend = endtime = obj.$('.endTime').val().split(':')
    var chron = starttime[1] + " " + starttime[0] + ' * * '+ wdString
    var date1 = new Date(2000,0,1,starttime[0], starttime[1])
    var date2 = new Date(2000,0,1,endtime[0], endtime[1])
    var duration = date2 - date1

    var meetingEvent = {chron: chron, duration: duration}
    return meetingEvent
  },
  unrender: function() {
    this.$el.remove()
  }
});
