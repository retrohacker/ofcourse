var CalendarView = Backbone.View.extend({
  defaultLocation: ".ofcourse-body",
  template: JADE.calendar,
  initialize: function(){
    var myself = this
    this.collection.bind('reset', this.addAll,this);
    this.setElement(this.template());
    this.fixedCollection;
    radio.on('unrender:CalendarView',this.unrender,this)
    radio.on('render:CalendarView', this.render, this)
    radio.on('unrender',this.unrender,this)
    radio.on('unrender:page', this.unrender,this)
    return this
  },
  render: function(location) {
    var location = location || this.defaultLocation;
    $(location).append(this.$el);
    $('#calendar').fullCalendar({
      header: {
        left: 'prev,next,today',
        center: 'title',
        right: 'agendaDay,agendaWeek,month'
      },
      timezone: 'local'
    });
    return this
  },
  addAll: function() {
      //for each model in eventCollection convert the time to local time
      _.each(this.collection.models,function(model){
        model.toCurrentTime();
      })
      $('#calendar').fullCalendar('addEventSource',App.eventCollection.toJSON())
      return this
  },
  unrender: function(){
    this.$el.remove()
    return this
  }
});
