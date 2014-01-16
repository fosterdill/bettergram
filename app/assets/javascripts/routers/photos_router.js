Bettergram.Routers.PhotosRouter = Backbone.Router.extend({
  initialize: function (options) {
    this.$rootEl = options.rootEl;
  },

  routes: {
    "": "photosIndex",
    "photos/:id": "photoShow"
  },

  photosIndex: function () {
    var that = this;
    Bettergram.photos.fetch({
      success: function () {
        var photosIndex = new Bettergram.Views.PhotosIndex({ 
          collection: Bettergram.photos
        });
        that._swapView(photosIndex.render().$el);
      }
    });
  },

  photoShow: function (id) {
    var that = this;
    this._getPhoto(id, function (photo) {
      var photoShow = new Bettergram.Views.PhotoShow({ model: photo });
      that._swapView(photoShow.render().$el);
    });
  },

  _getPhoto: function (id, callback) {
    var photo = Bettergram.photos.get(id);
    if (photo !== undefined) {
      callback(photo);
    } else {
      photo = new Bettergram.Models.Photo({ id: id });
      photo.collection = Bettergram.photos;
      photo.fetch({
        success: function () {
          Bettergram.photos.add(photo);
          callback(photo);
        }
      });
    }
  },

  _swapView: function () {
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$rootEl.html(view.render().$el);
  }
});
