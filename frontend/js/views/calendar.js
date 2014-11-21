var CalendarView = Backbone.View.extend({
  defaultLocation: "body",
  template: JADE.calendar,
  initialize: function(){
    this.collection.bind('reset', this.addAll);
    this.setElement(this.template());
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
      }
    });
    return this
  },
  addAll: function() {
      $('#calendar').fullCalendar('addEventSource',App.eventCollection.toJSON())
      return this
  },
  unrender: function(){
    this.$el.remove()
    return this
  }
});
