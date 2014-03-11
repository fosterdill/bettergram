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
      var that = this;
      var user = new Bettergram.Models.User();
      user.urlRoot = 'api/users';
      user.id = id;
      user.fetch({
        success: function (data) {
          if (data.get('errors') == undefined) {
            var showView = new Bettergram.Views.UserShow({ model: data });
            that._swapView(showView);
          } else {
            var errorHtml = '<div class="alert alert-warning' + 
              ' alert-dismissable"> <button type="button" class="close"' + 
              ' data-dismiss="alert" aria-hidden="true">&times;</button>' + 
              data.get('errors') + '.  </div>';
            $results = $('nav.navbar');
            $('#content').prepend(errorHtml);
          }
        }
      });
    }
  },

  _swapView: function (view) {
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$rootEl.html(view.render().$el);
  }
});
