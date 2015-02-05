var taskbar = new TaskbarView({radio: radio})
var sidebar = new SidebarView({radio: radio})

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
    "viewCourse":"viewCourse",
    "addAssignment" : "addAssignment"
  },
  'home': function(){
    radio.trigger('unrender:page getTaskbar render:SidebarView')
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
  },
  'calendar': function(){
    radio.trigger('unrender:page getTaskbar');
    App.eventCollection = new EventCollection([])
    var calendarView = new CalendarView({radio: radio, collection: App.eventCollection})
      .render();
    App.eventCollection.fetch({reset:true})//not the most efficient way to populate collection, but needed because of calender.js events
  },
  'addCourse': function(){
    radio.trigger('unrender:page getTaskbar');
    var addCourseParentView = new AddCourseParentView({radio: radio,
                                                       collection: App.courses,
                                                       model: App.user
                                                      }).render()
    App.courses.fetch({reset:true})//not the most efficient way to populate collection
   },  
  'createCourse':function(){
    radio.trigger('unrender:page getTaskbar')
    this.createCourseParentView = new CreateCourseParentView({collection: App.courses, 
                                                              radio: radio,
                                                              formVals:createCourseCollection().toJSON(),
                                                              model: App.user}).render()
  },
  'courses':function(){
    radio.trigger('unrender:page getTaskbar')
    App.courses.fetch({reset:true})
    var userCoursesView = new UserCoursesView({radio: radio})
      .render()
    var userCoursesContainer = new UserCoursesContainerView({radio: radio, collection: App.courses})
      .render()
  },
  'viewCourse':function(){
    radio.trigger('unrender:page getTaskbar')
    var course = new SingleCourseParentView({radio: radio,
                                             model: App.course,
                                             collection: App.courseEvents})
                                          .render()
    App.courseEvents.fetch()
  },
  'addAssignment': function(){
    radio.trigger('unrender:page')
    App.courses.fetch({reset:true})
    var addAssignmentView = new AddAssignView({radio: radio, collection: App.courses})
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
App.courseEvents = new CourseEventsCollection()
App.course

var workspace = new Workspace({radio: radio});
Backbone.history.start();

function init() {
  if(!App.user.isLoggedIn()){
    console.log('zapp.js: user is not logged in')
    workspace.navigate('login', {trigger: true});
  }
  else if(App.user.isLoggedIn()){
    workspace.navigate('home', {trigger: true});
    if(!App.user.hasUniversity()) {
      //TODO: remove these. they should not be hardcoded.
      console.log('zapp.js: user has no university')
      var siu = new University({id:1,name:'Southern Illinois University',abbreviation:'SIU',state:'IL',city:'Carbondale',location:'Carbondale, IL'})
      var delaware = new University({id:2,name:'The Delaware One',location:'Somewhere, DE'})
      var universityCollection = new UniversityCollection([siu,delaware]);

      var uniSelectView = new UniSelectView({radio: radio, collection: universityCollection})
      var popup = new PopupView({contains:uniSelectView})
      popup.render()
    }
  }
}
