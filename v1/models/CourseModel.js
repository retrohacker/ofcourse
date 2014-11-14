var module = module || {}
var Backbone = Backbone || require('backbone')

module.exports.tableName = "courses"
module.exports.types = {//TODO: assign better types
  university: 'VARCHAR(50) NOT NULL',
  id: 'SERIAL PRIMARY KEY',//This will link all occurances of this class
  title: 'VARCHAR(50)',//Event title on the calendar
  number: 'VARCHAR(50)',
  section: 'VARCHAR(50)',
  start: 'VARCHAR(50)',   //Start date time  YYYY-MM-DD'T'HH:MM:SS
  end: 'VARCHAR(50)'      //End date time    YYYY-MM-DD'T'HH:MM:SS
}

var CourseModel = Backbone.Model.extend({
  /*
  defaults:{
    university: '',
    id: '',     //This will link all occurances of this class
    title: '',  //Event title on the calendar
    number: '',
    section: '',
    start: '',   //Start date time. YYYY-MM-DD'T'HH:MM:SS
    end: ''      //End date time
  }*/
})
