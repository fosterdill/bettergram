Bettergram.Views.PhotoShow = Backbone.View.extend({
  events: {
    "click #create-comment": "addComment",
    "click #like": "likePhoto",
    "click #unlike": "likePhoto"
  },

  initialize: function () {
    this.listenTo(this.model.get('comments'), 'add', this.render);
  },

  likePhoto: function (event) {
    if ($('#like').hasClass('liked')) {
      $('#like').removeClass('liked');
    } else {
      $('#like').addClass('liked');
    }
    // var like = new Bettergram.Models.Like();
    // like.save({ media_id: this.model.id }, {
    //   success: function () {
    //     console.log('success');
    //   },

    //   error: function (error) {
    //     console.log(error);
    //   }
    // });
  },

  unlikePhoto: function (event) {
    event.preventDefault();
    $('#unlike').hide();
    $('#comment-area').prepend(' <button id="like" type="button" class="btn btn-default btn-lg"> <span class="glyphicon glyphicon-heart"></span> Like </button> ');
    // var like = new Bettergram.Models.Like();
    // like.destroy({ media_id: this.model.id }, {
    //   success: function () {
    //     console.log('success');
    //   },

    //   error: function (error) {
    //     console.log(error);
    //   }
    // });
  },

  appendComment: function (comment) {
    $('#comments-list').append('<li>' + comment.get('body') + '</li>');
  },

  template: JST['photos/show'],

  render: function () {
    var renderedContent = this.template({
      photo: this.model,
      current_user: Bettergram.user
    });
    this.$el.html(renderedContent);
    return this;
  },
  
  addComment: function (event) {
    event.preventDefault();
    var id = this.model.id;
    var that = this;
    var message = $('#body-comment').val();
    var comment = new Bettergram.Models.Comment();
    if (!this.model.get('comments').models) {
      this.model.set(
        'comments',
        new Bettergram.Collections.Comments(this.model.get('comments'))
      )
    }
    comment.collection = this.model.get('comments');
    comment.save({ media_id: id, body: message }, {
      success: function () {
        var photoInPhotos = Bettergram.photos.get(id);
        var photoInUser = Bettergram.user.get('posts').get(id);
        if (photoInPhotos)
          photoInPhotos.get('comments').add(comment);
        if (photoInUser)
          photoInUser.get('comments').add(comment);
      }
    });
  }
});
