Bettergram.Views.PhotosIndex = Backbone.View.extend({
  events: {
    'click img.rounded-picture': 'showPictureModal'
  },

  initialize: function () {
    _.bindAll(this, 'scrollHandler');
    $(window).scroll(this.scrollHandler);

    this.on('addPhotos', this.render);
    this.rows = new Bettergram.Collections.Photos();
    this.throttled = _.throttle(this.addPhotos.bind(this), 2000);
  },

  render: function () {
    var that = this;
    this.$rowsEl = $('<div>');
    this.collection.each(function (photo, index) {
      that.rows.add(photo);
      if (that.rows.length === 3) {
        var rowView = new Bettergram.Views.PhotoRow({
          collection: that.rows
        });
        that.$rowsEl.append(rowView.render().$el);
        that.rows = new Bettergram.Collections.Photos();
      }
    });

    this.$el.append(this.$rowsEl);
    this.preloadImages();
    return this;
  },

  preloadImages: function () {
    this.collection.each(function (photo) {
      var image = new Image();
      image.src = photo.get('images').standard_resolution.url;
    });
  },

  showPictureModal: function (event) {
    event.preventDefault();
    var id = $(event.target).data('id');
    var photo = new Bettergram.Models.Photo({ id: id });
    var that = this;
    photo.collection = new Bettergram.Collections.Photos();
    var $modal = $('.modal');
    photo.fetch({
      success: function () {
        var showView = new Bettergram.Views.PhotoShow({ model: photo });
        $modal.find('.modal-content').html(showView.render().$el);
        $modal.modal();
      }
    });
  },

  scrollHandler: function (event) {
    var scrollPos = $(window).scrollTop();
    var scrollMax = $(document).height() - $(window).height();
    var that = this;
    if (scrollMax - scrollPos < 400) {
      this.throttled();
    }
  },

  addPhotos: function () {
    var that = this;
    // console.log(this.collection);
    var id = this.collection.last().get('id');
    this.collection.fetch({
      data: { max_id: this.collection.last().get('id') },
      success: function () {
    //    that.collection.remove(that.collection.first());
        that.trigger('addPhotos');
      }
    });
  }
});
