var TaskbarButtonView = Backbone.View.extend({
  tagName: "i",
  events : {
    "click" : "onClick"
  },
  initialize: function(opts) {
    this.onClick = opts.onClick || function(){}
    this.title = opts.title || undefined
    this.$el.attr('title',this.title)
    radio.on('render:TaskButtonView',this.render,this)
    radio.on('unrender:TaskButtonView',this.unrender,this)
    radio.on('unrender',this.unrender,this)
    return this
  },
  unrender: function() {
    this.$el.remove()
  }
});

var TaskbarView = Backbone.View.extend({
  defaultLocation: "body",
  buttons: [],
  initialize: function() {
    this.setElement(this.template(this.model.toJSON()))
    this.buttonPos = 0
    radio.on('unrender:TaskbarView',this.unrender,this)
    radio.on('render:TaskbarView',this.render,this)
    radio.on('unrender',this.unrender,this)
    radio.on('getTaskbar',this.render,this)
    this.state = false
    return this
  },
  template: JADE.taskbar,
  render: function() {
    if(this.state) return this
    this.addButtonLeft(new TaskbarButtonView({
      className:'fa fa-fw fa-bars waves-effect waves-light',
      onClick: function () {
        radio.trigger('sidebar:changeState')
      },
      title: "Settings"
    }))
    .addButtonRight(new TaskbarButtonView({
      className:'fa fa-fw fa-plus waves-effect waves-light',
      onClick: function() {
        //will produce small quick assignment box
      },
      title: "Add Assignment"
    }))
    .addButtonRight(new TaskbarButtonView({
      className:'fa fa-fw fa-paper-plane-o waves-effect waves-light',
      onClick: function() {
        //Show Notifications
      },
      title: "Show Notifications"
    }))
    var location = location || this.defaultLocation
    $(location).prepend(this.$el)
    this.state = true
    return this
  },
  unrender: function() {
    this.state = false
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
    this.buttonPos = this.buttonPos + 1
    return this.addButton(button,'.ofcourse-taskbar-right-' + this.buttonPos)
  },
  addButton: function(button,location) {
    this.buttons.push(button)
    this.$(location).append(button.$el)
    return this
  }
});

