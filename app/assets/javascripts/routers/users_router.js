Bettergram.Routers.UsersRouter = Backbone.Router.extend({
  initialize: function (options) {
    this.$rootEl = options.rootEl;
  },

  routes: {
    "users/:id": "userShow"
  },

  userShow: function (id) {
    var user = new Bettergram.Models.User({ id: id });
    var that = this;
    user.fetch({
      success: function () {
        var showView = new Bettergram.Views.UserShow({ model: user });
        that._swapView(showView);
      }
    });
  },

  _swapView: function (view) {
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$rootEl.html(view.render().$el);
  }
});
