var SidebarView = Backbone.View.extend({
  defaultLocation: "body",
  initialize: function() {
    this.setElement(this.template())
    radio.on('unrender:SidebarView',this.unrender,this)
    radio.on('render:TaskbarView',this.render,this)
    radio.on('unrender',this.unrender,this)
    return this
  },
  template: JADE.sidebar,
  render: function() {
    var location = location || this.defaultLocation
    $(location).append(this.$el)
    return this
  },
  unrender: function() {
    this.$el.remove()
    return this
  }
});
