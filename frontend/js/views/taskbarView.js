var Wrapper = Backbone.View.extend({
	initialize: function(){
		this.render();
	},
	render: function(){
		var id = this.model.get('id');
		var css_class = this.model.get('css_class');
		var newNode = $('<div id="' + id + '" class="' + css_class + '"></div>');
		this.$el.append(newNode);
	}
});

var ViewContainer = Backbone.View.extend({
	tagName: "div",
	className: function(){
		this.model.get('css_class');
	},
	id: function(){
		this.model.get('id');
	},
	initialize: function(){
		this.render();
	},
	render: function(){
		var id = this.model.get('id');
		var css_class = this.model.get('css_class');
		var newNode = $('<div id="' + id + '" class="' + css_class + '"></div>');
		this.$el.append(newNode);
	
	}
});

var TaskbarView = Backbone.View.extend({
	initialize: function(){
		this.render();
		this.addButtons();
			},
	render: function(){
		var id = this.model.get('id');
		var css_class = this.model.get('css_class');
		var newNode = $('<div id="' + id + '" class="' + css_class + '"></div>');
		this.$el.append(newNode);
	},
	addButtons: function(){
			}
});
var SettingsDropDown = Backbone.View.extend({
	render: function(){
		this.id = this.model.get('id');
		var css_class = this.model.get('css_class');
		var newNode = $('<div id="' + this.id + '" class="' + css_class + '">Eat Shit And Die</div>');
		this.$el.prepend(newNode);
	},
	open: function(){
		this.render();
	},
	close: function(){
		$('#' + this.id).remove();
	}
});
var AddClassButton = Backbone.View.extend({
	initialize: function(){
		this.render();
	},
	render: function(){
		var id = this.model.get('id');
		var css_class = this.model.get('css_class');
		var newNode = $('<div id="' + id + '" class="' + css_class + '"></div>');
		this.$el.append(newNode);
	}
});
var SettingsButton = Backbone.View.extend({
	initialize: function(){
		this.settingsDropDown =  new SettingsDropDown({
			el: '#viewContainer',
			model: settingsDropDownModel
		});	
		this.model.set({"settingsOpen": false});
		this.render();
	},
	render: function(){
		this.id = this.model.get('id');
		var css_class = this.model.get('css_class');
		var newNode = $('<div id="' + this.id + '" class="' + css_class + '"></div>');
		this.$el.append(newNode);
	},
	events: {
		'click #settings': 'clickSettings'
		},
	clickSettings: function(){
		if(this.model.get('settingsOpen') == true){
			this.model.set({"settingsOpen": false});
			this.settingsDropDown.close();			
		}else{
			this.settingsDropDown.open();
			this.model.set({"settingsOpen":true});
		}
	}	
});
