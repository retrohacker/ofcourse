var CourseEventsCollection = Backbone.Collection.extend({
  url: function(){
    return '/v1/user/course/'+ this.id + '/events'
  },
  model: EventModel
});
