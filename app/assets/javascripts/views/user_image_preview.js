Bettergram.Views.UserImagePreview = Backbone.View.extend({
  initialize: function (link) {
    this.link = link;
  },

  template: JST['user_image_preview'],

  render: function () {
    var renderedContent = this.template({ link: this.link });
    this.$el.html(renderedContent);
    return this;
  }
});
