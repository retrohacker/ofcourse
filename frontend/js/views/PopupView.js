var PopupView = Backbone.View.extend({
  defaultLocation: "body",
  template: JADE.popup,
  initialize: function(opts) {
    this.setElement(this.template())
    this.contains = opts.contains
    if(this.contains) {
      this.contains
      this.$('.ofcourse-popup-content').append(this.contains.$el)
    }
    radio.on('unrender:popup',this.unrender, this)
    radio.on('render:popup',this.render,this)
    radio.on('popup:close',this.unrender,this)
    radio.on('unrender',this.unrender,this)
    radio.on('unrender:page',this.unrender,this)
  },
  render: function(location) {
    var location = location || this.defaultLocation
    $(location).append(this.$el)
    return this;
  },
  unrender: function() {
    this.$el.remove()
    this.contains.unrender()
  }
})
