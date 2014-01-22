Bettergram.Routers.SearchRouter = Backbone.Router.extend({
  initialize: function (options) {
    this.$rootEl = options.rootEl;
  },

  routes: {
    "search/:query": "loadResults"
  },

  loadResults: function (query) {
    console.log(query);
  }
});
