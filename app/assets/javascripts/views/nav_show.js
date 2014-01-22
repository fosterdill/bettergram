Bettergram.Views.NavShow = Backbone.View.extend({
  template: JST['nav/show'],

  events: {
    "click #search-button": "performSearch"
  },

  render: function () {
    var renderedContent = this.template({ user: this.model });
    this.$el.html(renderedContent);
    return this;
  },

  performSearch: function (event) {
    event.preventDefault();
    var query = $('#search-query').val();
    Backbone.history.navigate('#/search/' + encodeURI(query), {trigger: true});
  }
});
