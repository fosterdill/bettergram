Bettergram.Views.PhotoShow = Backbone.View.extend({
  events: {
    "click #create-comment": "addComment"
  },

  initialize: function () {
    this.listenTo(this.model.get('comments'), 'add', this.render);
  },

  appendComment: function (comment) {
    $('#comments-list').append('<li>' + comment.get('body') + '</li>');
  },

  template: JST['photos/show'],

  render: function () {
    var renderedContent = this.template({photo: this.model});
    this.$el.html(renderedContent);
    return this;
  },
  
  addComment: function (event) {
    event.preventDefault();
    var id = this.model.id;
    var that = this;
    var message = $('#body-comment').val();
    var comment = new Bettergram.Models.Comment();
    comment.collection = this.model.get('comments');
    comment.save({ media_id: id, body: message }, {
      success: function () {
        that.model.get('comments').add(comment);
      }
    });
  }
});
