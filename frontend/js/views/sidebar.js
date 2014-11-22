var SidebarView = Backbone.View.extend({
  defaultLocation: "body",
  initialize: function() {
    this.setElement(this.template())
    radio.on('unrender:SidebarView',this.unrender,this)
    radio.on('render:TaskbarView',this.render,this)
    radio.on('unrender',this.unrender,this)
    radio.on('sidebar:changeState',this.changeState, this)
    radio.on('unrender:page', this.closeSidebar, this) 
    this.sidebarState = false
    return this
  },
  events: {
    "click #sidebar-calendar": "openCalendar",
    "click #sidebar-courses": "openCourses"
  },
  template: JADE.sidebar,
  openCalendar: function() {
    workspace.navigate('calendar',{trigger:true})
  },
  openCourses: function() {
    workspace.navigate('courses',{trigger:true})
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
  },
  closeSidebar:function(){
    //$('body').css('transform','translatex(0)')
    this.sidebarState = false
  }
});
