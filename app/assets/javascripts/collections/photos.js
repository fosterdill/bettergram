Bettergram.Collections.Photos = Backbone.Collection.extend({
  url: "/api/photos",
  model: Bettergram.Models.Photo,
  parse: function (data) {
    this.photoIds = this.photoIds || [];
    var that = this;
    var filteredData = [];
    data.forEach(function (photo) {
      var inArray = that.photoIds.indexOf(photo.id);
      if (inArray !== -1) {
        console.log('dup found');
      } else {
        filteredData.push(photo);
        that.photoIds.push(photo.id);
      }
    })
    return filteredData;
  }
});
