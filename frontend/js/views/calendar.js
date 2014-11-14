var CalendarView = Backbone.View.extend({

  defaultLocation: "body",
  template: JADE.calendar,
  initialize: function(){
    this.setElement(this.template());
    radio.on('unrender:CalendarView',this.unrender,this)
    radio.on('render:CalendarView', this.render, this)
    radio.on('unrender',this.unrender,this)
    radio.on('unrender:page', this.unrender,this)
  },
  render: function(location) {
    var location = location || this.defaultLocation;
    $(location).append(this.$el);
    $('#calendar').fullCalendar({
      header: {
        left: 'prev,next,today',
        center: 'title',
        right: 'agendaDay,agendaWeek,month'
      }
    });
    $('#calendar').fullCalendar('addEventSource',courseCollection.toJSON())
  },
  unrender: function(){
    this.$el.remove()
  }
});
