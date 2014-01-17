Bettergram.Views.PhotosIndex = Backbone.View.extend({
  template: JST['photos/index'],

  events: {
    'scroll window': 'scrollHandler'
  },

  initialize: function () {
    _.bindAll(this, 'scrollHandler');
    $(window).scroll(this.scrollHandler);
    this.rows = new Bettergram.Collections.Photos();
    this.on('addPhotos', this.render);
    this.shouldLoadPhotos = true;
    this.$rowEl = $("<div>");
  },

  render: function () {
    this.collection.each(this._addRows.bind(this));
    this.$el.append(this.$rowEl);
    return this;
  },

  scrollHandler: function (event) {
    var scrollPos = $(window).scrollTop();
    var scrollMax = $(document).height() - $(window).height();
    if ((scrollMax - scrollPos < 100) && (this.shouldLoadPhotos)) {
      this.addPhotos();
      this.shouldLoadPhotos = false;
      setTimeout(this.okToLoadPhotos.bind(this), 2000);
    }
  },

  okToLoadPhotos: function () {
    this.shouldLoadPhotos = true;
  },

  addPhotos: function () {
    var newPhotos = new Bettergram.Collections.Photos();
    $lastRow = $('[data-id="' + this.lastId + '"]').hide();
    var that = this;
    newPhotos.url = "/api/photos?max_id=" + this.lastId;
    newPhotos.fetch({
      success: function () {
        that.collection = newPhotos;
        that.trigger('addPhotos');
      }
    });
  },

  _addRows: function (item, iterator) {
      this.rows.add(item);
      this.lastId = item.get('id');
      if (this.rows.length === 3) {
        var photoRow = new Bettergram.Views.PhotoRow({ collection: this.rows });
        this.$rowEl.append(photoRow.render().$el);
        this.rows = new Bettergram.Collections.Photos();
      }
    }
});
