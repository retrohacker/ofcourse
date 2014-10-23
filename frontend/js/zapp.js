var Workspace = Backbone.Router.extend({
	routes:{
		"usr/home": "home",
		"usr/home/bypass": "bypass",
		"usr/login" : "login"
	},
	'home': function(){
		
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
		var wrapper = new Wrapper({
			el: 'body',
			model: wrapperModel
		});	
		var logoView = new LogoView({
			el: '#wrapper',
			model: logoViewModel
		});
		var facebookLoginButton = new FacebookLoginButton({
			el: '#wrapper',
			model: facebookLoginButtonModel
		});
		var bypassLoginButton = new BypassLoginButton({
			el:'#wrapper',
			model: bypassLoginBtnModel
		});
	}
});
var workspace = new Workspace();
Backbone.history.start();
workspace.navigate('usr/login', {trigger: true});
