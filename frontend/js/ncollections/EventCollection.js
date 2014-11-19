var EventCollection = Backbone.Collection.extend({
  url: '/v1/user/events',
  model: EventModel
});
