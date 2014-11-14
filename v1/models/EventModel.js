var module = module || {}
var Backbone = Backbone || require('backbone')

module.exports.tableName = "events"
module.exports.types = {//TODO: assign better types
  userid: 'INTEGER',
  id: 'VARCHAR(50) NOT NULL',//This will link all occurances of this class
  title: 'VARCHAR(50)',//Event title on the calendar
  number: 'VARCHAR(50)',
  section: 'VARCHAR(50)',
  start: 'VARCHAR(50)',   //Start date time  YYYY-MM-DD'T'HH:MM:SS
  end: 'VARCHAR(50)'      //End date time    YYYY-MM-DD'T'HH:MM:SS
}


var EventModel = Backbone.Model.extend({
  /*defaults:{
    userid: -1,
    id: '',     
    title: '',  
    number: '',
    section: '',
    start: '',   
    end: ''      
  }*/
});
