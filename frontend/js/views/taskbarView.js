var TaskbarButtonView = Backbone.View.extend({
  tagName: "i",
  events : {
    "click" : "onClick"
  },
  initialize: function(opts) {
    this.onClick = opts.onClick || function(){}
    radio.on('render:TaskButtonView',this.render,this)
    radio.on('unrender:TaskButtonView',this.unrender,this)
    radio.on('unrender',this.unrender,this)
    return this
  }
});

var TaskbarView = Backbone.View.extend({
  defaultLocation: "body",
  buttons: [],
  initialize: function() {
    this.setElement(this.template())
    radio.on('unrender:TaskbarView',this.unrender,this)
    radio.on('render:TaskbarView',this.render,this)
    radio.on('unrender',this.unrender,this)
    return this
  },
  template: JADE.taskbar,
  render: function() {
    var location = location || this.defaultLocation
    $(location).prepend(this.$el)
    return this
  },
  unrender: function() {
    this.$el.remove()
    return this
  },
  addButtonLeft: function(button) {
    return this.addButton(button,'.ofcourse-taskbar-left')
  },
  addButtonCenter: function(button) {
    return this.addButton(button,'.ofcourse-taskbar-center')
  },
  addButtonRight: function(button) {
    return this.addButton(button,'.ofcourse-taskbar-right')
  },
  addButton: function(button,location) {
    this.buttons.push(button)
    this.$(location).append(button.$el)
    return this
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
