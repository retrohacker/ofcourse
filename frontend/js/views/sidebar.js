var SidebarView = Backbone.View.extend({
  defaultLocation: "body",
  initialize: function() {
    this.setElement(this.template())
    radio.on('unrender:SidebarView',this.unrender,this)
    radio.on('render:SidebarView',this.render,this)
    radio.on('unrender',this.unrender,this)
    radio.on('sidebar:changeState',this.changeState, this)
    radio.on('unrender:page', this.closeSidebar, this) 
    this.sidebarState = false
    this.rendered = false
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
    this.rendered = true
    this.closeSidebar()
    return this
  },
  unrender: function() {
    this.rendered = false
    this.$el.remove()
    return this
  },
  changeState: function(){
    if(this.sidebarState) this.closeSidebar()
    else this.openSidebar()
  },
  closeSidebar:function(){
    var width = this.$el.outerWidth() + "px"
    //Need to translate ofcourse-body
    $('.ofcourse-body').css('left',0)
    //Need to translate ofcourse-taskbar
    $('.ofcourse-taskbar').css('left',0)
    //Need to translate self
    this.$el.css('left',"-"+width)
    this.sidebarState = false
  },
  openSidebar:function(){
    var width = this.$el.outerWidth() + "px"
    //Need to translate ofcourse-body
    $('.ofcourse-body').css('left',width)
    //Need to translate ofcourse-taskbar
    $('.ofcourse-taskbar').css('left',width)
    //Need to translate self
    this.$el.css('left',0)
    this.sidebarState = true
  }
});
