var ofCourseView = Backbone.View.extend({
	unrender: function(){
		$('#' + this.id).remove();
	}
});
var radio = _.extend({}, Backbone.Events);
