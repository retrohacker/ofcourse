var Workspace = Backbone.Router.extend({
  routes:{
    "usr/home": "home",
    "usr/home/bypass": "bypass",
    "usr/login" : "login"
  },
  'home': function(){
    radio.trigger('unrender');
    var wrapper = new Wrapper({
      el: 'body',
      model: wrapperModel
    });
    var taskbarview = new TaskbarView({
      el: '#wrapper',
      model: taskbarModel
    });
    var viewContainer = new ViewContainer({
      el: '#wrapper',
      model: viewContainerModel
    });
    var settingsButton = new SettingsButton({
      el: '#MainTaskbar',
      model: settingsButtonModel
    });
    var addClassButton = new AddClassButton({
      el: '#MainTaskbar',
      model: addClassButtonModel
    });  
  },
  'bypass': function(){
    alert('bypass');
  },
  'login': function(){
    radio.trigger('unrender')
    this.loginView = new LoginView({radio: radio});
    this.loginView.render();
  }
});
var workspace = new Workspace({radio: radio});
Backbone.history.start();
workspace.navigate('usr/login', {trigger: true});
