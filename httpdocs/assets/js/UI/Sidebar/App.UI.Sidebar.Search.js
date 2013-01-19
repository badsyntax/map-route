App.UI.Sidebar.Search = function(container) {

  var form = container.find('form');
  var field = $('#search-input');
  var menu = form.find('.dropdown-menu');
  var placesSearch = new App.UI.PlacesSearch(field);

  var handlers = {
    fieldFocus: function() {
      setTimeout(this.select.bind(this), 1);
    },
    formSubmit: function(e) {
      e.preventDefault();
      placesSearch.selectAddress(field.val());
    },
    menuClick: function(e) {
      e.preventDefault();
      e.stopPropagation();
      var elem = $(e.target);
      if (elem.is('label')) {
        var checkbox = elem.find('input[type="checkbox"]');
        checkbox.prop('checked', !checkbox.prop('checked'));
      }
    }
  };

  field.on('focus', handlers.fieldFocus);
  form.on('submit', handlers.formSubmit);
  menu.on('click', handlers.menuClick)
};