//Create the tasker, but don't render
var taskbar = new TaskbarView({radio: radio})
      .createBasicTaskbar()

var Workspace = Backbone.Router.extend({
  routes:{
    "home": "home",
    "login" : "login",
    "register" : "register",
    "uniSelect" : "uniSelect",
    "calendar" : "calendar",
    "addCourse": "addCourse",
    "createCourse": "createCourse",
    "courses":"courses",
    "viewCourse":"viewCourse"
  },
  'home': function(){
    radio.trigger('unrender:page getTaskbar')
  },
  'login': function(){
    radio.trigger('unrender')
    this.loginView = new LoginView({radio: radio,formVals:loginCollection().toJSON()}).render()
  },
  'register': function(){
    radio.trigger('unrender')
    this.user = new UserModel()
    this.registerView = new FormView({radio: radio,formVals:registrationCollection().toJSON(), user:App.user}).render()
  },
  'uniSelect': function(){
    radio.trigger('unrender:page')
    
    //TODO: remove these. they should not be hardcoded.
    var siu = new University({id:1,name:'Southern Illinois University',abbreviation:'SIU',state:'IL',city:'Carbondale',location:'Carbondale, IL'})
    var delaware = new University({id:2,name:'The Delaware One',location:'Somewhere, DE'})
    App.universityCollection = new UniversityCollection([siu,delaware]);
    
    var uniSelectView = new UniSelectView({radio: radio, collection: App.universityCollection}).render()
    //App.universityCollection.fetch({reset:true})
  },
  'calendar': function(){
    radio.trigger('unrender:page');
    App.eventCollection = new EventCollection([])
    var calendarView = new CalendarView({radio: radio, collection: App.eventCollection})
      .render();
    App.eventCollection.fetch({reset:true})//not the most efficient way to populate collection, but needed because of calender.js events
  },
  'addCourse': function(){
    radio.trigger('unrender:page');
    var addCourse = new AddCourseView({radio: radio})
      .render()
    var uniCourseContainer = new UniCourseContainerView({radio: radio, collection: App.courses, model: App.user})
      .render()
    App.courses.fetch({reset:true})//not the most efficient way to populate collection
   },  
  'createCourse':function(){
    radio.trigger('unrender:page')
    this.createCourseView = new CreateCourseView({collection: App.courses, radio: radio, formVals:createCourseCollection().toJSON(), model: App.user}).render()
   },
  'courses':function(){
    radio.trigger('unrender:page')
    App.courses.fetch({reset:true})
    var userCoursesView = new UserCoursesView({radio: radio})
      .render()
    var userCoursesContainer = new UserCoursesContainerView({radio: radio, collection: App.courses})
      .render()
  },
  'viewCourse':function(){
    radio.trigger('unrender:page')
    var courseEvents = new EventCollection([])
    var course = new UserCourseView({radio: radio, model: App.course})
      .render()
    var courseEventContainer = new UserCourseEventContainerView({radio: radio, collection: App.courseEvents})
      .render()
    App.courseEvents.fetch()
  }  
});
var App = App || {}
App.user = new UserModel()
App.user.fetch({
  success: init,
  error: init,
})
App.courses = new CourseCollection()
App.courseEvents = new CourseEventsCollection()
App.course

var workspace = new Workspace({radio: radio});
Backbone.history.start();

function init() {
  if(!App.user.isLoggedIn()){
    console.log('zapp.js: user is not logged in')
    workspace.navigate('login', {trigger: true});
  }
  else if(App.user.isLoggedIn() && !App.user.hasUniversity()){
    console.log('zapp.js: user has no university')
    workspace.navigate('uniSelect', {trigger: true});
  }
  else
    workspace.navigate('home', {trigger: true});
}
