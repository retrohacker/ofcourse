var ImgModel = Backbone.Model.extend({
	defaults: {
		'css_class' : '',
		'pure_class' : ''
	}
	
});
var LogoImg = Backbone.View.extend({
		
	initialize: function(){
		this.render();
	},
	render: function(){
		var imgUrl = this.model.get('imgUrl');
		var css_class = this.model.get('css_class'); 
		var pure_class = this.model.get('pure_class'); 
		var newNode = $('<img  class="' + pure_class + ' ' + css_class +'" src="' + imgUrl + '">');
		this.$el.html(newNode);
	}	
});
var FacebookButton = Backbone.View.extend({
	
	initialize: function(){
		this.render();
	},
	render: function(){
		var imgUrl = this.model.get('imgUrl');
		var css_class = this.model.get('css_class');	
		var pure_class = this.model.get('pure_class');
		var newNode = $('<img class="' + pure_class + ' ' + css_class + '" src="' + imgUrl + '">');
	this.$el.html(newNode);
	},
	events: {
		'click' : 'goToFacebookLogin'	
	},
	goToFacebookLogin: function(){
		alert(this.model.get('msg'));
	}
});
var logoModel = new ImgModel({
	imgUrl : 'images/logo.png',
	'css_class': 'logo',
	'pure_class': 'pure-img'	
});
var logoImg = new LogoImg({
	el: '#logoContain',
	 model: logoModel});
var facebookButtonModel = new ImgModel({
	imgUrl: 'images/facebook.png',
	'css_class': 'facebook',
	'pure_class': 'pure-img',
	'msg': 'Go to Facebook login'
});
var facebookButton = new FacebookButton({
	el: '#facebookContain',
	 model: facebookButtonModel}); 
