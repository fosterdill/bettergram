Bettergram.Routers.UsersRouter = Backbone.Router.extend({
  initialize: function (options) {
    this.$rootEl = options.rootEl;
    this.user = options.user;
  },

  routes: {
    "user": "userShow"
  },

  userShow: function (id) {
    var that = this;
    var showView = new Bettergram.Views.UserShow({ model: this.user });
    that._swapView(showView);
  },

  _swapView: function (view) {
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$rootEl.html(view.render().$el);
  }
});
