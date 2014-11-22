var EventModel = Backbone.Model.extend({
    url: '/v1/event/event'
  /*Expected Values
    cid: '',    //Parent course ID
    id: '',     //Unique event ID
    title: '',  //Event title on the calendar
    number: '',
    section: '',
    start: '',   //Start date time. YYYY-MM-DD'T'HH:MM:SS
    end: ''      //End date time
  */
});
