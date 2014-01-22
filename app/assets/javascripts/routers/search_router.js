Bettergram.Routers.SearchRouter = Backbone.Router.extend({
  initialize: function (options) {
    this.$rootEl = options.rootEl;
  },

  events: {
    "click #search-button": "performSearch"
  },

  routes: {
    "/search/:query": "loadResults"
  },

  performSearch: function (event) {
    event.preventDefault();
    alert('hi');
  },

  loadResults: function (query) {
  }
});
