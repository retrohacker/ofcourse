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
    radio.trigger('unrender');
    var taskbar = new TaskbarView({radio: radio})
      .createBasicTaskbar()
      .render()
  },
  'login': function(){
    radio.trigger('unrender')
    this.loginView = new LoginView({radio: radio,formVals:loginCollection().toJSON()}).render()
  },
  'register': function(){
    radio.trigger('unrender')
    this.user = new UserModel()
    this.registerView = new FormView({radio: radio,formVals:registrationCollection().toJSON(), user:this.user}).render()
  },
  'uniSelect': function(){
    radio.trigger('unrender:page')
    this.uniSelectView = new UniSelectView({radio: radio, universities: universityCollection.toJSON(), user: this.user}).render()
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
    var course = new UserCourseView({radio: radio, model: App.course})
      .render()
  }  
});
var App = App || {}
App.user = new UserModel()
App.user.fetch({
  success: init,
  error: init,
})
App.courses = new CourseCollection()
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
