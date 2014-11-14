var CourseCollection = Backbone.Collection.extend({
  model: CourseModel
});

var courseCollection = new CourseCollection([
  //Need to pull user's courses fro DB here
]);
