Bettergram.Views.UserShow = Backbone.View.extend({
  template: JST['users/show'],
  
  render: function () {
    $('li.active').removeClass('active');
    $('#profile-menu-button').addClass('active');
    var renderedContent = this.template({ user: this.model });
    this.$el.html(renderedContent);
    return this;
  }
});
