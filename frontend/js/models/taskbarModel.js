var WrapperModel = Backbone.Model.extend({});
var wrapperModel = new WrapperModel({
	id: 'wrapper',
	css_class: 'wrapper'
});
var TaskbarModel = Backbone.Model.extend({});
var taskbarModel = new TaskbarModel({
	id : 'MainTaskbar',
	css_class : 'taskbar'
});
var ViewContainerModel = Backbone.Model.extend({});
var viewContainerModel = new ViewContainerModel({
	id : 'viewContainer',
	css_class : 'viewContainer'
});
var SettingsButtonModel = Backbone.Model.extend({});
var settingsButtonModel = new SettingsButtonModel({
	id: 'settings',
	css_class : 'left taskButton'
});
var SettingsDropDownModel = Backbone.Model.extend({});
var settingsDropDownModel = new SettingsDropDownModel({
	id: 'settingsDropDown',
	css_class: 'settingsDropDown'
});
var AddClassButtonModel = Backbone.Model.extend({});
var addClassButtonModel = new AddClassButtonModel({
	id: 'addClassButton',
	css_class: 'right taskButton'
});
