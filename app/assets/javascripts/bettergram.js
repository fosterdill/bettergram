window.Bettergram = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    var that = this;
    Bettergram.photos = new Bettergram.Collections.Photos();
    Bettergram.user = new Bettergram.Models.User();
    Bettergram.user.fetch({
      success: function (user) {
        that.installNavBar(user);
        var rootEl = $('#content');
        new Bettergram.Routers.PhotosRouter({ rootEl: rootEl });
        new Bettergram.Routers.UsersRouter({ 
          rootEl: rootEl, 
          user: user
        });
        new Bettergram.Routers.SearchRouter({ rootEl: rootEl });
        Backbone.history.start();
      }
    });
  },

  installNavBar: function (user) {
    var navView = new Bettergram.Views.NavShow({ model: user });
    $('#main-nav').html(navView.render().$el);
  }
};

$(document).ready(function(){
  Bettergram.initialize();
});
