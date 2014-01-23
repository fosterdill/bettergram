Bettergram.Routers.SearchRouter = Backbone.Router.extend({
  initialize: function (options) {
    this.$rootEl = options.rootEl;
  },

  routes: {
    "search/:type/:query": "loadResults"
  },

  loadResults: function (type, query) {
    var that = this;
    var result = new Bettergram.Models.Result();
    result.collection = new Bettergram.Collections.Results();
    result.fetch({
      data: { 
        type: type,
        query: query 
      },
      success: function (result) {
        var resultsView = new Bettergram.Views.ResultsIndex({
          model: result,
          type: type,
          query: query
        });
        that._swapView(resultsView);
      }
    });
  },


  _swapView: function (view) {
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$rootEl.html(view.render().$el);
  }
});
