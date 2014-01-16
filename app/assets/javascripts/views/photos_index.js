Bettergram.Views.PhotosIndex = Backbone.View.extend({
  template: JST['photos/index'],
  render: function () {
    var renderedContent = this.template({ photos: this.collection });
    this.$el.html(renderedContent);
    return this;
  }
});
