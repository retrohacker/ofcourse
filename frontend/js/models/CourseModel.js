var CourseModel = Backbone.Model.extend({
  defaults:{
    name: '',
    number: '',
    section: '',
    dates: [] // array of dates that the class is on including start time
  }
});
