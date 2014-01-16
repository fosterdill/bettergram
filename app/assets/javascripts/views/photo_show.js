Bettergram.Views.PhotoShow = Backbone.View.extend({
  template: JST['photos/show'],
  render: function () {
    var renderedContent = this.template({photo: this.model});
    this.$el.html(renderedContent);
    return this;
  }
});
