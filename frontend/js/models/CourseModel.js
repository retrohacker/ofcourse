var CourseModel = Backbone.Model.extend({
  url: '/v1/user/addCourse',
  defaults:{
    university: '',
    id: '-1',     //This will link all occurances of this class
    title: '',  //Event title on the calendar
    number: '',
    section: '',
    start: '',   //Start date time. YYYY-MM-DD'T'HH:MM:SS
    end: ''      //End date time
  }
});
