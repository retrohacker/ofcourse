var CalendarView = Backbone.View.extend({
  defaultLocation: ".ofcourse-body",
  template: JADE.calendar,
  initialize: function(){
    this.collection.bind('reset', this.addAll);
    this.setElement(this.template());
    radio.on('unrender:CalendarView',this.unrender,this)
    radio.on('render:CalendarView', this.render, this)
    radio.on('unrender',this.unrender,this)
    radio.on('unrender:page', this.unrender,this)
    $(window).on('resize', this.adjust)
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
      height: ($(window).height() - 75),
      timezone: 'local'
    });
    $('.ofcourse-body').css('opacity', 1)
    return this
  },
  addAll: function() {
      $('#calendar').fullCalendar('addEventSource',App.eventCollection.toJSON())
      return this
  },
  adjust: function() {
    $('#calendar').fullCalendar('option', 'height', ($(window).height() - 75))
  },
  unrender: function(){
    this.$el.remove()
    return this
  }
});
