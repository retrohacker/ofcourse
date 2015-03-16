var CourseSearchParentView = Backbone.View.extend({
  defaultLocation: '.ofcourse-body',
  template: JADE.courses,
  initialize: function(opts){
    this.setElement(this.template()),
    this.children = [],
    this.collection = new CourseCollection([]);
    radio.on('unrender:CreateCourseParentView', this.unrender,this)
    radio.on('render:CreateCourseParentView', this.render,this)
    radio.on('unrender:page',this.unrender, this)
    radio.on('unrender', this.unrender,this)
    
    this.listenTo(this.collection, 'add', this.rerender)
    this.listenTo(this.collection, 'remove', this.rerender)
    this.listenTo(this.collection, 'reset', this.rerender)

  },
  render: function(location){
    var location = location || this.defaultLocation
    $(location).append(this.$el)
    this.createChildren()
    return this;
  },
  createChildren: function(){
    this.children.push(new CourseSearchChild_SearchBoxView({}).render());
    this.children.push(new CourseSearchChild_ResultBoxView({collection:this.collection}).render());
    return this;
  },
  unrender: function() {
    this.$el.remove()
  },
  rerender: function(){
    console.log("WORKING!!!!!!!!!");
 }
});

