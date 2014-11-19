var Workspace = Backbone.Router.extend({
  routes:{
    "home": "home",
    "login" : "login",
    "register" : "register",
    "uniSelect" : "uniSelect",
    "calendar" : "calendar",
    "addCourse": "addCourse",
    "createCourse": "createCourse",
    "courses":"courses"
  },
  'home': function(){
    radio.trigger('unrender');
    var  sidebar = new SidebarView({radio:radio})
      .render()
    var taskbar = new TaskbarView({radio: radio})
      .addButtonLeft(new TaskbarButtonView({
          className:'fa fa-fw fa-bars',
          onClick: function () {
            if(!sidebar.getState()){
              $('body').css('transform','translateX(25%)')
            } else {
              $('body').css('transform','translateX(0)')
            }
            radio.trigger('sidebar:changeState') 
          }
        }))
      .addButtonRight(new TaskbarButtonView({
        className:'fa fa-fw fa-paper-plane-o',
        onClick: function() {
          console.log("Add Event!")
        }
      }))
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
    var eventCollection = new EventCollection([])
    var calendarView = new CalendarView({radio: radio, collection: eventCollection})
      .render();
    eventCollection.fetch({reset:true})//not the most efficient way to populate collection, but needed because of calender.js events
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
  }     
});
var App = App || {}
App.user = new UserModel()
App.user.fetch({
  success: init,
  error: init,
})
App.courses = new CourseCollection()


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
