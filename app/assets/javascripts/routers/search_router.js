Bettergram.Routers.SearchRouter = Backbone.Router.extend({
  initialize: function (options) {
    this.$rootEl = options.rootEl;
  },

  routes: {
    "search/:query": "loadResults"
  },

  loadResults: function (query) {
    var that = this;
    var result = new Bettergram.Models.Result();
    $('#menu-buttons li').removeClass('active');
    result.collection = new Bettergram.Collections.Results();
    result.fetch({
      data: { 
        query: query 
      },
      success: function () {
        var resultsView = new Bettergram.Views.ResultsIndex({
          model: result,
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
