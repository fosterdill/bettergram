Bettergram.Views.NavShow = Backbone.View.extend({
  template: JST['nav/show'],

  events: {
    "submit form.navbar-form": "performSearch",
    "click ul.navbar-nav.nav > li > a": "hidePopover",
    "click .popover-content a": "showResults"
  },

  render: function () {
    var renderedContent = this.template({ user: this.model });
    this.$el.html(renderedContent);
    return this;
  },

  performSearch: function (event) {
    event.preventDefault();
    this.showPopover();
  },

  hidePopover: function () {
    $('#search-query').popover('hide');
  },

  showResults: function (event) {
    event.preventDefault();
    $('.popover-content a').parent().removeClass('active');
    $(event.currentTarget).parent().addClass('active');
    var query = $('#search-query').val();
    var type = $(event.target).data('id');
    Backbone.history.navigate('#/search/' + type + '/' + encodeURI(query), {trigger: true});
  },

  showPopover: function () {
    $('li.active').removeClass('active');
    var popoverView = new Bettergram.Views.PopoverShow();
    $('#search-query').popover({
      content: popoverView.render().$el,
      placement: 'left',
      trigger: 'manual',
      html: true
    });
    $('#search-query').popover('show');
  },
});
