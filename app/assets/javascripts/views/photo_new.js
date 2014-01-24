Bettergram.Views.PhotoNew = Backbone.View.extend({
  template: JST['photos/new'],

  render: function () {
    $('li.active').removeClass('active');
    $('#new-post-menu-button').addClass('active');

    var renderedContent = this.template();
    this.$el.html(renderedContent);
    return this;
  }
});
