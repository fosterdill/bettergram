window.Bettergram = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    Bettergram.photos = new Bettergram.Collections.Photos();
    new Bettergram.Routers.PhotosRouter({ rootEl: $('#content') });
    new Bettergram.Routers.UsersRouter({ rootEl: $('#content') });
    Backbone.history.start();
  }
};

$(document).ready(function(){
  Bettergram.initialize();
});
