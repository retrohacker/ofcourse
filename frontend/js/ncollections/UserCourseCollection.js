var UserCourseCollection = Backbone.Collection.extend({
  url: '/v1/user/courses',
  model: CourseModel
});
