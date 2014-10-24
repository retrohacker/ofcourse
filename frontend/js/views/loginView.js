var ImgView = ofCourseView.extend({
	initialize: function(){
		this.render();
	},
		render: function(){
		this.id = this.model.get('id');
		var src = this.model.get('src');
		var alt = this.model.get('alt');
		var css_class = this.model.get('css_class');
		var newNode = $('<img id="' + this.id + '" src="' + src + '" alt="' + alt + '" >');
		this.$el.append(newNode);
	}
});
var LogoView = ImgView.extend({});

var FacebookLoginButton = ImgView.extend({
	events: {
		'click #facebook': 'clickFacebook'
		},
	clickFacebook: function(){
		workspace.navigate('usr/faceBookLogin', {trigger: true});
	}
});
var BypassLoginButton = ImgView.extend({
	events: {
		'click #bypass' : 'clickBypass'
		},
	clickBypass: function(){
		this.unrender();
		workspace.navigate('usr/home', {trigger: true});
	}
});
var LoginView = Backbone.View.extend({
	initialize: function(){
		radio.on('unrender-LoginView',this.unrender, this);
	},
	render: function(){
		this.wrapper = new Wrapper({
			el: 'body',
			model: wrapperModel
		});	
		this.logoView = new LogoView({
			el: '#wrapper',
			model: logoViewModel
		});
		this.facebookLoginButton = new FacebookLoginButton({
			el: '#wrapper',
			model: facebookLoginButtonModel
		});
		this.bypassLoginButton = new BypassLoginButton({
			el:'#wrapper',
			model: bypassLoginBtnModel,
		});
	},
	unrender: function(){
		console.log('shit buckets');
		this.logoView.unrender();
		this.facebookLoginButton.unrender();
		this.bypassLoginButton.unrender();
	}
});	
