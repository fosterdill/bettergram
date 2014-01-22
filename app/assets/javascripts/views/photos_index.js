Bettergram.Views.PhotosIndex = Backbone.View.extend({
  events: {
    'click .img-thumbnail': 'showPictureModal'
  },

  template: JST['photos/index'],
  
  initialize: function () {
    _.bindAll(this, 'scrollHandler');
    $(window).scroll(this.scrollHandler);
    var that = this;

    this.collection.each(function (photo) {
      that.preloadImage(photo);
    });
    this.listenTo(this.collection, 'add', this.addPhoto);
    this.throttledFetch = _.throttle(this.fetchPhotos.bind(this), 2000);
  },

  fetchPhotos: function () {
    this.collection.fetch({
      data: {max_id: 1},
      remove: false
    });
  }, 

  render: function () {
    var that = this;
    var renderedContent = this.template({ photos: this.collection });
    this.$el.html(renderedContent);
    return this;
  },

  addPhoto: function (photo) {
    $('#photos').append('<li class="picture-list-item"><a href="#"><img data-id="' + 
                        photo.id + 
                        '" class="pull-left img-margin img-thumbnail" src="' + 
                        photo.get('images').low_resolution.url +
                        '"></a></li>');
    this.preloadImage(photo);
  },

  preloadImage: function (photo) {
    var image = new Image();
    image.src = photo.get('images').standard_resolution.url;
  },

  showPictureModal: function (event) {
    event.preventDefault();
    var id = $(event.target).data('id');
    console.log(id);
    var photo = Bettergram.photos.get(id);
    console.log(photo);
    var $modal = $('.modal');
    var showView = new Bettergram.Views.PhotoShow({ model: photo });
    $modal.find('.modal-content').html(showView.render().$el);
    $modal.modal();
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
