var testing
var Workspace = Backbone.Router.extend({
  routes:{
    "usr/home": "home",
    "usr/login" : "login",
    "usr/register" : "register"
  },
  'home': function(){
    var sidebarState = false; //hidden
    radio.trigger('unrender');
    var sidebar = new SidebarView({radio:radio})
      .render()
    var taskbar = new TaskbarView({radio: radio})
      .addButtonLeft(new TaskbarButtonView({
          className:'fa fa-fw fa-bars',
          onClick: function () {
            testing = this
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
  },
  'login': function(){
    radio.trigger('unrender')
    this.loginView = new LoginView({radio: radio}).render()
  },
  'register': function(){
    radio.trigger('unrender')
    this.registerView = new FormView({radio: radio,formVals:registrationCollection().toJSON()}).render()
  }
});
var workspace = new Workspace({radio: radio});
Backbone.history.start();
workspace.navigate('usr/login', {trigger: true});
