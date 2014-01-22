Bettergram.Views.PhotosIndex = Backbone.View.extend({
  events: {
    'click img.img-thumbnail': 'showPictureModal'
  },

  template: JST['photos/index'],
  
  initialize: function () {
    _.bindAll(this, 'scrollHandler');
    $(window).scroll(this.scrollHandler);

    this.listenTo(this.collection, 'add', this.addPhoto);
  },

  render: function () {
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
    if (document.body.scrollHeight == 
        document.body.scrollTop +        
        window.innerHeight) {
      this.collection.fetch({
        data: {max_id: 1},
        reset: false
      });
    }
  }
});
