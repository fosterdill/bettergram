window.Bettergram = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    Bettergram.photos = new Bettergram.Collections.Photos();
    var rootEl = $('#content');
    new Bettergram.Routers.PhotosRouter({ rootEl: rootEl });
    new Bettergram.Routers.UsersRouter({ rootEl: rootEl });
    new Bettergram.Routers.SearchRouter({ rootEl: rootEl });
    Backbone.history.start();
  }
};

$(document).ready(function(){
  Bettergram.initialize();
});
