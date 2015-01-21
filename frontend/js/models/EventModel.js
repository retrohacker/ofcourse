var EventModel = Backbone.Model.extend({
    url: '/v1/event/event', 
  /*Expected Values
    cid: '',    //Parent course ID
    id: '',     //Unique event ID
    title: '',  //Event title on the calendar
    number: '',
    section: '',
    start: '',   //Start date time. YYYY-MM-DD'T'HH:MM:SS
    end: ''      //End date time
  */
    //converts Database stored utc time into current time zone
    toCurrentTime: function(){
      //Time stored without timezone indicator
      //Thus, when exported to model it interprets this as local time
      //This causes local to UTC to be twice as large it should be for incorrectDate
      //Ex: UTC comes out as + or - offset instead of 0
      var incorrectDate = new Date(this.get('start'))
      //To solve: we create a date with the offset taken off
      //getTime() in milisec and getTimezoneOffset() in min ( * 60000 min to mili)
      var correctedDate = new Date(incorrectDate.getTime() -( incorrectDate.getTimezoneOffset()*60000))
      //iso string in utc time
      var newStartString = correctedDate.toISOString()
      //set start as correct utc time
      this.set({start: newStartString})
      
      //Repeat for end
    
      incorrectDate = new Date(this.get('end'))
      correctedDate = new Date(incorrectDate.getTime() -( incorrectDate.getTimezoneOffset()*60000))
      newStartString = correctedDate.toISOString()
      this.set({end: newStartString})
    },
    toUTCTime: function(){
      //split by every non-numerical value
      var splitArray = this.get('start').split(/\D/)
      // create new date with local time with split array
      var localTime = new Date(splitArray[0],
                               splitArray[1],
                               splitArray[2],
                               splitArray[3],
                               splitArray[4],
                               splitArray[5])
      //create ISO string then set as start
      var UTCString = localTime.toISOString()
      this.set({start: UTCString})
      
      //repeat for end
      splitArray = this.get('end').split(/\D/)
      localTime = new Date(splitArray[0],
                               splitArray[1],
                               splitArray[2],
                               splitArray[3],
                               splitArray[4],
                               splitArray[5])
      UTCString = localTime.toISOString()
      this.set({end: UTCString})
    } 
});
