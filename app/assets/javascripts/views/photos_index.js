Bettergram.Views.PhotosIndex = Backbone.View.extend({
  events: {
    'click img.rounded-picture': 'showPictureModal'
  },

  template: JST['photos/index'],
  
  initialize: function () {
    _.bindAll(this, 'scrollHandler');
    $(window).scroll(this.scrollHandler);
  },

  render: function () {
    var renderedContent = this.template({ photos: this.collection });
    this.$el.html(renderedContent);
    return this;
  },

  preloadImages: function () {
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
    console.log('scroll handles');
  }
});
