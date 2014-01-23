Bettergram.Models.Result = Backbone.Model.extend({
  parse: function (data) {
    return {users: new Bettergram.Collections.Users(data)};
  }
});
