var CourseCollection = Backbone.Collection.extend({
  url: '/v1/course/courses',
  model: CourseModel
});
