var ImgView = Backbone.View.extend({
	initialize: function(){
		this.render();
	},
		render: function(){
		var id = this.model.get('id');
		var src = this.model.get('src');
		var alt = this.model.get('alt');
		var css_class = this.model.get('css_class');
		var newNode = $('<img id="' + id + '" src="' + src + '" alt="' + alt + '" >');
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
		workspace.navigate('usr/home', {trigger: true});
	}
});
