Bettergram.Views.PopoverShow = Backbone.View.extend({
  template: JST['nav/popover'],

  render: function () {
    var renderedContent = this.template();
    this.$el.html(renderedContent);
    return this;
  }
});
