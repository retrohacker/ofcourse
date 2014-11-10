var Workspace = Backbone.Router.extend({
  routes:{
    "usr/home": "home",
    "usr/login" : "login",
    "usr/calendar" : "calendar"
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
            console.log(sidebar.getState())
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
    this.loginView = new LoginView({radio: radio}).render();
  },
  'calendar': function(){
   /* if(!sidebarState) {
      $('body').css('transform','translateX(25%)')
    } else {
      $('body').css('transform','translateX(0)')
    }
    sidebarState = !sidebarState
    }*/

    radio.trigger('unrender:page');
    var calendarView = new CalendarView({radio: radio})
    calendarView.render();
  }
});
var workspace = new Workspace({radio: radio});
Backbone.history.start();
workspace.navigate('usr/login', {trigger: true});
