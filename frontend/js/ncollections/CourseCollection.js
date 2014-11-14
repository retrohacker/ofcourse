var CourseCollection = Backbone.Collection.extend({
  url: '/v1/user/events',
  model: CourseModel
});
//var course1 = new CourseModel({id: "test1", title: "Test 1", number: '666',start: '2014-11-13',end: '2014-11-13' })
//var course2 = new CourseModel({id: "test2", title: "Test 2", number: '667',start: '2014-11-09',end: '2014-11-11' })
//var course3 = new CourseModel({id: "test3", title: "Test 3", number: '668',start: '2014-11-12',end: '2014-11-12' })
//var courseCollection = new CourseCollection([course1,course2,course3]);
var courseCollection = new CourseCollection([])
