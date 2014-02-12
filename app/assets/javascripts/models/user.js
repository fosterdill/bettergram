Bettergram.Models.User = Backbone.Model.extend({
  urlRoot: 'api/user',

  parse: function (data) {
    var posts = data.posts;
    data.posts = new Bettergram.Collections.Photos(posts);
    return data;
  }
});
