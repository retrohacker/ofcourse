var Workspace = Backbone.Router.extend({
  routes:{
    "home": "home",
    "login" : "login",
    "register" : "register",
    "uniSelect" : "uniSelect",
    "calendar" : "calendar"
  },
  'home': function(){
//    var sidebarState = false; //hidden
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
    this.loginView = new LoginView({radio: radio}).render()
  },
  'register': function(){
    radio.trigger('unrender')
    this.user = new UserModel()
    this.registerView = new FormView({radio: radio,formVals:registrationCollection().toJSON(), user:this.user}).render()
  },
  'uniSelect': function(){
    var sidebarState = false; //hidden
    radio.trigger('unrender')
    var sidebar = new SidebarView({radio:radio})
      .render()
    var taskbar = new TaskbarView({radio: radio})
      .addButtonLeft(new TaskbarButtonView({
        className:'fa fa-fw fa-bars',
        onClick: function () {
          if(!sidebarState) {
            taskbar.$el.css('transform','translateX(25%)')
            sidebar.$el.css('transform','translateX(0)')
          } else {
            taskbar.$el.css('transform','translateX(0)')
            sidebar.$el.css('transform','translateX(-100%)')
          }
          sidebarState = !sidebarState
        }
      }))
      .addButtonRight(new TaskbarButtonView({
        className:'fa fa-fw fa-paper-plane-o',
        onClick: function() {
          console.log("Add Event!")
        }
      }))
      .render()
    this.uniSelectView = new UniSelectView({radio: radio, universities: universityCollection.toJSON(), user: this.user}).render()
  },
  'calendar': function(){
    radio.trigger('unrender:page');
    var calendarView = new CalendarView({radio: radio})
    calendarView.render();
  }
});
var App = App || {}
App.user = new UserModelApp()
App.user.fetch({
  success: init,
  error: init,
})

var workspace = new Workspace({radio: radio});
Backbone.history.start();

function init() {
  if(!App.user.isLoggedIn())
    workspace.navigate('login', {trigger: true});
  else if(!App.user.hasUniversity())
    workspace.navigate('uniSelect', {trigger: true});
  else
    workspace.navigate('home', {trigger: true});
}
