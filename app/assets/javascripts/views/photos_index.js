Bettergram.Views.PhotosIndex = Backbone.View.extend({
  template: JST['photos/index'],
  render: function () {
    var that = this;
    var rows = new Bettergram.Collections.Photos();
    var lastId;
    this.collection.each(function (item, iterator) {
      rows.add(item);
      if ((iterator + 1) % 3 === 0) {
        var photoRow = new Bettergram.Views.PhotoRow({ collection: rows });
        that.$el.append(photoRow.render().$el);
        that.lastId = rows.last().get('id');
        rows = new Bettergram.Collections.Photos();
      }
      if (that.collection.length - 1 === iterator) {
        var photoRow = new Bettergram.Views.PhotoRow({ collection: rows });
        that.$el.append(photoRow.render().$el);
        that.lastIndex = iterator;
      }
    });
    this.lastId = this.lastId || rows.last().get('id');
    return this;
  },

  addPhotos: function () {
  }
});
