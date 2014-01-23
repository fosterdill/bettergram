Bettergram.Views.ResultsIndex = Backbone.View.extend({
  template: JST['results/index'],

  initialize: function (options) {
    this.type = options.type;
    this.query = options.query;
  },

  render: function () {
    var renderedContent = this.template({ 
      result: this.model,
      type: this.type,
      query: this.query
    });
    this.$el.html(renderedContent);
    return this;
  }
});
