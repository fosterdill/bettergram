Bettergram.Models.User = Backbone.Model.extend({
  urlRoot: 'api/users',

  parse: function (data) {
    var posts = data.posts;
    data.posts = new Bettergram.Collections.Photos(posts);
    return data;
  }
});
