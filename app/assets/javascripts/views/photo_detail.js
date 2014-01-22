Bettergram.Views.PhotoDetail = Backbone.View.extend({
  template: JST['photos/detail'],
  render: function () {
    var renderedContent = this.template({ photo: this.model });
    this.$el.html(renderedContent);
    return this;
  }
});
