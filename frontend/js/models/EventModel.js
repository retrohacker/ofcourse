var EventModel = Backbone.Model.extend({
  defaults:{
    userid: -1,
    id: '',     //This will link all occurances of this class
    title: '',  //Event title on the calendar
    number: '',
    section: '',
    start: '',   //Start date time. YYYY-MM-DD'T'HH:MM:SS
    end: ''      //End date time
  }
});
