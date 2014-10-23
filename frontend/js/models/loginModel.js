var FacebookLoginButtonModel = Backbone.Model.extend({});
var facebookLoginButtonModel = new FacebookLoginButtonModel({
	'id': 'facebook',
	'src': '/static/images/facebook.png',
	'alt': '',
	'css_class': 'facebookButton',
});
var LogoViewModel = Backbone.Model.extend({});
var logoViewModel = new LogoViewModel({
	'id': 'logo',
	'src': 'static/images/logo.png',
	'alt': '',
	'css_class': 'loginLogo'
});
var BypassLoginBtnModel = Backbone.Model.extend({});
var bypassLoginBtnModel = new BypassLoginBtnModel({
	'id': 'bypass',
	'src': '',
	'alt': "bypass",
	'css_class': 'bypassBtn'
});
