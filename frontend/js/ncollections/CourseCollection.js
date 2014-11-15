var CourseCollection = Backbone.Collection.extend({
  url: '/v1/user/courses',
  model: CourseModel
});

/*var SIU_CS_437 = new CourseModel({
  id: '1',
  title: 'Machine Learn and Soft Computing',
  number: 'CS-437',
  section: '001',
});
var SIU_CS_330 = new CourseModel({
  id: '2',
  title: 'Into Des & Analysis of Alg',
  number: 'CS-330',
  section: '001',
});*/
var courseCollection = new CourseCollection([])
//var courseCollection = new CourseCollection([SIU_CS_437]);

//var course1 = new CourseModel({id: "test1", title: "Test 1", number: '666',start: '2014-11-13',end: '2014-11-13' })
//var course2 = new CourseModel({id: "test2", title: "Test 2", number: '667',start: '2014-11-09',end: '2014-11-11' })
//var course3 = new CourseModel({id: "test3", title: "Test 3", number: '668',start: '2014-11-12',end: '2014-11-12' })
//var courseCollection = new CourseCollection([course1,course2,course3]);
