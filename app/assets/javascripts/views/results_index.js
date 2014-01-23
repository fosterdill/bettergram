Bettergram.Views.ResultsIndex = Backbone.View.extend({
  template: JST['results/index'],

  initialize: function (options) {
    this.query = options.query;
  },

  render: function () {
    var renderedContent = this.template({ 
      result: this.model,
      query: this.query
    });
    this.$el.html(renderedContent);
    return this;
  }
});
