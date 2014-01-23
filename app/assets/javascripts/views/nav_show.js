Bettergram.Views.NavShow = Backbone.View.extend({
  template: JST['nav/show'],

  events: {
    "submit form.navbar-form": "performSearch"
  },

  render: function () {
    var renderedContent = this.template({ user: this.model });
    this.$el.html(renderedContent);
    return this;
  },

  performSearch: function (event) {
    event.preventDefault();
    var query = this.$('#search-query').val();
    this.$('#search-query').val('');
    Backbone.history.navigate(
      "#/search/" + encodeURI(query), 
      { trigger: true }
    );
  }
});
