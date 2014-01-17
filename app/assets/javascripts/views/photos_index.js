Bettergram.Views.PhotosIndex = Backbone.View.extend({
  template: JST['photos/index'],
  render: function () {
    var that = this;
    var rows = new Bettergram.Collections.Photos();
    this.collection.each(function (item, iterator) {
      rows.add(item);
      if ((iterator + 1) % 3 === 0) {
        var photoRow = new Bettergram.Views.PhotoRow({ collection: rows });
        that.$el.append(photoRow.render().$el);
        rows = new Bettergram.Collections.Photos();
      }
      if (that.collection.length - 1 === iterator) {
        var photoRow = new Bettergram.Views.PhotoRow({ collection: rows });
        that.$el.append(photoRow.render().$el);
      }
    });
    return this;
  }
});
