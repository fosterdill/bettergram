Bettergram.Views.PhotoDetail = Backbone.View.extend({
  template: JST['photos/detail'],
  render: function () {
    var timeString = moment(this.model.get('created_time') * 1000).fromNow();
    var renderedContent = this.template({ 
      photo: this.model,
      time: timeString
    });
    this.$el.html(renderedContent);
    return this;
  }
});
