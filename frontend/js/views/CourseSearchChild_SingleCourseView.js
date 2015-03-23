var CourseSearchChild_SingleCourseView = Backbone.View.extend({
  defaultLocation: ".oc-userCourses-courseContainer",
  template: JADE.userCoursesDiv,
  initialize: function(opts){
    var info = {title: this.model.get('title'),
                number: this.model.get('number'),
                section: this.model.get('section')
               }
    this.setElement(this.template(info))
    radio.on('unrender:CourseSearchChild_SingleCourseView', this.unrender, this)
    radio.on('render:UserCoursesChild_SingleCourseView', this.render, this)
    radio.on('unrender', this.unrender, this)
    radio.on('unrender:page', this.unrender, this)
  },
  events: {
    "click" : "onclick"
  },
  render: function(location) {
    var location = location || this.defaultLocation
    $(location).append(this.$el)
    return this;
  },
  unrender: function() {
    radio.off(null,null,this)
    this.$el.remove()
  },
  onclick: function() {
    App.userCourses.fetch()
    App.userCourses.add(this.model)
    
    var data = {"cid" : this.model.get('id'), "uid" : App.user.get('id') }

     
    $.ajax({
      url: '/v1/user/joinCourse',
      type: "POST",
      data: JSON.stringify(data),
      headers: {'Content-Type': 'application/json'},
      success: function(){
        workspace.navigate('home', {trigger: true})
      }
    }) 

    console.log('Course Added')
    radio.trigger('open:course')
  }
});

