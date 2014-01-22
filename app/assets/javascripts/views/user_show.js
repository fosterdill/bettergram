Bettergram.Views.UserShow = Backbone.View.extend({
  template: JST['users/show'],

  initialize: function () {
    this.$modal = $('.modal');
  },
  
  events: {
    'click .img-thumbnail': 'showPictureModal'
  },
  
  render: function () {
    var that = this;
    $('li.active').removeClass('active');
    $('#profile-menu-button').addClass('active');
    var renderedContent = this.template({ user: this.model });
    this.$el.html(renderedContent);
    this.$userPhotosRoot = $(this.$el).find('#user-photos');
    this.model.get('posts').each(function (photo) {
      var photoDetail = new Bettergram.Views.PhotoDetail({ 
        model: photo
      });
      var imageListItem = photoDetail.render().$el;
      var image = imageListItem.find('img.img-thumbnail');
      image.addClass('user-show-image');
      image.removeClass('img-margin');
      that.$userPhotosRoot.append(imageListItem);
    });
    return this;
  },

  showPictureModal: function (event) {
    event.preventDefault();
    var id = $(event.target).data('id');
    var photo = this.model.get('posts').get(id);
    photo.set(
      'comments',
      new Bettergram.Collections.Comments(photo.get('comments').data)
    )
    var showView = new Bettergram.Views.PhotoShow({ model: photo });
    this.$modal.find('.modal-content').html(showView.render().$el);
    this.$modal.modal();
  },
});
