var CourseEventsCollection = Backbone.Collection.extend({
  url: function(){
    return '/v1/user/course/'+ this.cid + '/events'
  },
  initialize: function(){
    cid: ''
  },
  model: EventModel
});
