Bettergram.Models.User = Backbone.Model.extend({
  urlRoot: 'api/users',

  parse: function (data) {
    var posts = data.user.posts;
    data = new Bettergram.Models.User(data.user);
    data.set('posts', new Bettergram.Collections.Photos(posts));
    return data.attributes;
  }
});
