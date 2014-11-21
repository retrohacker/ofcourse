var EventCollection = Backbone.Collection.extend({
  url: '/v1/event/events',
  model: EventModel
});
