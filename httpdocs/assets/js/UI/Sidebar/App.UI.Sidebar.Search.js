App.UI.Sidebar.Search = function(container) {

  var field = $('#search-input');
  var service = new google.maps.places.AutocompleteService();
  var geocoder = new google.maps.Geocoder();
  var map = App.Map.instance();

  $(field).typeahead({
    source: function(query, process) {
      service.getPlacePredictions({ input: query }, function(predictions, status) {
        if (status !== google.maps.places.PlacesServiceStatus.OK) {
          console.log(status);
          return;
        }
        process($.map(predictions, function(prediction) {
          return prediction.description;
        }));
      });
    },
    updater: function (item) {
      geocoder.geocode({ address: item }, function(results, status) {
        if (status !== google.maps.GeocoderStatus.OK) {
          window.alert('Cannot find address');
          return;
        }
        map.setCenter(results[0].geometry.location);
        map.setZoom(12); 
      });
      return item;
    }
  });
};