App.UI.Sidebar.Search = function(container) {

  var form = container.find('form');
  var field = $('#search-input');
  var placesSearch = new App.UI.PlacesSearch(field);

  field.on('focus', function() {
    setTimeout(this.select.bind(this), 1);
  });

  form.on('submit', function(e) {
    e.preventDefault();
    placesSearch.showSearchOnMap(field.val());
  });
};