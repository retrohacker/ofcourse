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
    "click .ofcourse-sidebar-logos":"openHome",
    "click #sidebar-bg": "closeSidebar",
    "click #sidebar-addcourse": "openAddCourse",
    "click #sidebar-calendar": "openCalendar",
    "click #sidebar-courses": "openCourses",
    "click #sidebar-home": "openHome",
    "click #sidebar-createcourse": "openCreateCourse",
    "click #sidebar-assignments": "openAssignments",
    "click #sidebar-logout": "logout"
  },
  template: JADE.sidebar,
  logout: function() {
	 //TODO: add log out
	 $.get("/v1/auth/logout")
	 workspace.navigate('login',{trigger:true})
  },
  openHome: function() {
    workspace.navigate('home',{trigger:true})
  },
  openCalendar: function() {
    workspace.navigate('calendar',{trigger:true})
  },
  openCreateCourse: function() {
    workspace.navigate('createCourse', {trigger:true})
  },
  openCourses: function() {
    workspace.navigate('courses',{trigger:true})
  },
  openAssignments: function() {
    workspace.navigate('userAssignments',{trigger:true})
  },
  openAddCourse: function() {

    workspace.navigate('addCourse',{trigger:true})
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
    $('.ofcourse-sidebar').css('opacity', 0)
    $('.ofcourse-sidebar').css('transform','translateX(-125%)')
    $('.ofcourse-sidebar-background').css('opacity', 0)
    $('.ofcourse-sidebar-wrapper').css('z-index', '-20')
    $('.ofcourse-body').css('opacity', 1)
    this.sidebarState = false
  },
  openSidebar:function(){
    $('.ofcourse-sidebar').css('opacity', 1)
    $('.ofcourse-sidebar-wrapper').css('z-index', '20')
    $('.ofcourse-sidebar-background').css('opacity', .2)
    $('.ofcourse-sidebar').css('transform', 'translateX(0px)')
    this.sidebarState = true
  }
});
