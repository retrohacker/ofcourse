var CourseModel = Backbone.Model.extend({
  url: '/v1/course/',
  defaults:{
    department:'UCOL-TEST'//SHOULD NOT BE LIKE THIS
  }
    /* Expected Values
    university: //this is the university that the class belongs too
    id:         //This will link all occurances of this class (Primary Key from Server) NOT NEEDED IN USER INPUT FORM
    title:      //Event title on the calendar
    number:     //Course Number
    section:    //Course Section
    start:      //Start date time. YYYY-MM-DD'T'HH:MM:SS
    end:        //End date time. YYYY-MM-DD'T'HH:MM:SS */

    //Add verification
});
