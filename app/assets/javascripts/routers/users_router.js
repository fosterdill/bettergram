Bettergram.Routers.UsersRouter = Backbone.Router.extend({
  initialize: function (options) {
    this.$rootEl = options.rootEl;
    this.user = options.user;
  },

  routes: {
    "user": "userShow",
    "users/:id": "userShow"
  },

  userShow: function (id) {
    if (id === undefined) {
      var showView = new Bettergram.Views.UserShow({ model: this.user });
      this._swapView(showView);
    } else {
      console.log('nothing set up yet');
    }
  },

  _swapView: function (view) {
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$rootEl.html(view.render().$el);
  }
});
