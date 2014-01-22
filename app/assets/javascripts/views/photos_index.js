Bettergram.Views.PhotosIndex = Backbone.View.extend({
  events: {
    'click .img-thumbnail': 'showPictureModal'
  },

  initialize: function () {
    _.bindAll(this, 'scrollHandler');
    $(window).scroll(this.scrollHandler);
    var that = this;

    this.$modal = $('.modal');
    this.$ul = $('<ul id="photos">');
    this.listenTo(this.collection, 'add', this.addPhoto);
    this.throttledFetch = _.throttle(this.fetchPhotos.bind(this), 1000);
  },

  fetchPhotos: function () {
    this.collection.fetch({
      data: {max_id: 1},
      remove: false
    });
  }, 

  render: function () {
    $('li.active').removeClass('active');
    $('#feed-menu-button').addClass('active');
    var that = this;
    this.$el.html(this.$ul);
    this.collection.each(function(photo) { that.addPhoto(photo); });
    return this;
  },

  addPhoto: function (photo) {
    var detailView = new Bettergram.Views.PhotoDetail({ model: photo });
    this.$ul.append(detailView.render().$el);
    this.preloadImage(photo);
  },

  preloadImage: function (photo) {
    var image = new Image();
    image.src = photo.get('images').standard_resolution.url;
  },

  showPictureModal: function (event) {
    event.preventDefault();
    var id = $(event.target).data('id');
    var photo = Bettergram.photos.get(id);
    var showView = new Bettergram.Views.PhotoShow({ model: photo });
    this.$modal.find('.modal-content').html(showView.render().$el);
    this.$modal.modal();
  },

  scrollHandler: function (event) {
    var scrollPos = $(window).scrollTop();
    var scrollMax = $(document).height() - $(window).height();
    var that = this;
    if (scrollMax - scrollPos < 400) {
      this.throttledFetch();
    } 
  }
});
