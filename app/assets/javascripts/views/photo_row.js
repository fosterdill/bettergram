Bettergram.Views.PhotoRow = Backbone.View.extend({
  template: JST['photos/row'],

  render: function () {
    var renderedContent = this.template({ photos: this.collection });
    this.$el.html(renderedContent);
    return this;
  }
});
