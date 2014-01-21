Bettergram.Models.Photo = Backbone.Model.extend({
  parse: function (data) {
    var comments = data.comments.data;
    data.comments = new Bettergram.Collections.Comments(comments);
    return data;
  }
});
