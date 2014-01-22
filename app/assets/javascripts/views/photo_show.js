Bettergram.Views.PhotoShow = Backbone.View.extend({
  events: {
    "click #create-comment": "addComment"
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
    var message = $('#body-comment').val();
    var comment = new Bettergram.Models.Comment();
    comment.collection = new Bettergram.Collections.Comments();
    comment.save({ media_id: id, text: message }, {
      success: function (data) {
        console.log('success!');
        console.log(data);
      },

      error: function (data) {
        console.log('problem');
        console.log(data);
      }
    });
  }
});
