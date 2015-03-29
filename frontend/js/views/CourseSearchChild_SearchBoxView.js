var CourseSearchChild_SearchBoxView = Backbone.View.extend({
    defaultLocation: '.oc-courses-pageWrapper',
    template: JADE.joinCourse,
    initialize: function(opts){
      this.setElement(this.template()),
      radio.on('unrender:CreateCourseChild_SearchBoxView', this.unrender,this)
      radio.on('render:CreateCourseChild_SearchBoxView', this.render,this)
      radio.on('unrender:page',this.unrender, this)
      radio.on('unrender', this.unrender,this)

      /*this.odcsIsSync = false
      this.odcsTimeout
      this.odcsResults = null
      
      
      this.txtbox = this.$el.find('.ofcourse-course-search-title')
      this.txtbox.keyup(this.ofcourseDelayedCourseSearch(this.txtbox))*/
    },
    render: function(location){
      var location = location || this.defaultLocation
      $(location).append(this.$el)
      return this;
    },
    createChildren: function(){
      return this;
    },
    unrender: function() {
      this.$el.remove()
    },

    ofcourseDelayedCourseSearch: function(txtbox) {
      if(this.odcsIsSync) return;
      if(this.odcsTimeout) window.clearTimeout(this.odcsTimeout)
      console.log("Setting timeout: "+this.txtbox.value)
      odcsTimeout = window.setTimeout(this.ofcourseCourseSearch,350,this.txtbox.value)
    },

    ofcourseCourseSearch: function(title) {
      this.odcsIsSync = true
      var request = new XMLHttpRequest()
      request.onload = this.ofcourseSearchResults
      request.open('post','http://ofcourse-search.herokuapp.com/course/search')
      request.setRequestHeader('Content-Type','application/json;charset=UTF-8')
      request.send(JSON.stringify({"title":title}))
    },

    ofcourseSearchResults: function() {
      this.odcsIsSync = false
      this.odcsResults = new CourseCollection(JSON.parse(this.responseText))
      //var odcsView = new CourseSearchResultsView({collection:ocdsResults})
      console.log(odcsResults.toJSON())
    }
});

