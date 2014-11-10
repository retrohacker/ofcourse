var SidebarView = Backbone.View.extend({
  defaultLocation: "body",
  initialize: function() {
    this.setElement(this.template())
    radio.on('unrender:SidebarView',this.unrender,this)
    radio.on('render:TaskbarView',this.render,this)
    radio.on('unrender',this.unrender,this)
    radio.on('sidebar:changeState',this.changeState, this) 
    this.sidebarState = false
    return this
  },
  events: {
    "click #sidebar-calendar": "openCalendar"
  },
  template: JADE.sidebar,
  openCalendar: function() {
    console.log(this.sidebarState)
    if(this.sidebarState) {
      $('body').css('transform','translateX(0)')
      this.sidebarState = !this.sidebarState
    }
    workspace.navigate('usr/calendar',{trigger:true})
  },
  render: function() {
    var location = location || this.defaultLocation
    $(location).append(this.$el)
    return this
  },
  unrender: function() {
    this.$el.remove()
    return this
  },
  changeState: function(){
    this.sidebarState = !this.sidebarState
  },
  getState: function(){
    return this.sidebarState
  }
});
