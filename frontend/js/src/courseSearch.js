var odcsIsSync = false
var odcsTimeout
var odcsResults = null
function ofcourseDelayedCourseSearch(txtbox) {
  if(odcsIsSync) return

  ;if(odcsTimeout) window.clearTimeout(odcsTimeout)
  console.log("Setting timeout: "+txtbox.value)
  odcsTimeout = window.setTimeout(ofcourseCourseSearch,350,txtbox.value)
}

function ofcourseCourseSearch(title) {
  var loadingView = new LoadingView({radio: radio, color: '#441D9E'}).render()
  odcsIsSync = true
  var request = new XMLHttpRequest()
  request.onload = ofcourseSearchResults
  request.open('post','http://ofcourse-search.herokuapp.com/course/search')
  request.setRequestHeader('Content-Type','application/json;charset=UTF-8')
  request.send(JSON.stringify({"title":title}))
}

function ofcourseSearchResults() {
  odcsIsSync = false
  odcsResults = new CourseCollection(JSON.parse(this.responseText))
  //var odcsView = new CourseSearchResultsView({collection:ocdsResults})
  radio.trigger('upDateSearchCollection', odcsResults);
  
  console.log("courses being set");
  radio.trigger('unrender:LoadingView')
}
