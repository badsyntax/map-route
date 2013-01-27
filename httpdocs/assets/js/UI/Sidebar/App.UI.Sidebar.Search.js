App.UI.Sidebar.Search = function(container) {

  var map = App.Map.instance();
  var field = $('#search-input');
  var form = container.find('form');
  var menu = form.find('.dropdown-menu');

  var placesSearch = (function initPlacesSearch() {

    var search = new App.UI.PlacesSearch(field);

    search.on('onAddressSelect', function(e, result, status) {
      if (status !== google.maps.GeocoderStatus.OK) {
        App.log(status);
        return window.alert('Location was not found. Please try again.');
      }
      map.setCenter(result.geometry.location);
      map.setZoom(12); 
    });
  
    return search;
  }());

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
  menu.on('click', handlers.menuClick);
};