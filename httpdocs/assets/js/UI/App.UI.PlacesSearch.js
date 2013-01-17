App.UI.PlacesSearch = function(field) {
  this.field = field;
  this.map = App.Map.instance();
  this.service = new google.maps.places.AutocompleteService();
  this.geocoder = new google.maps.Geocoder();
  this.init();
};

App.UI.PlacesSearch.prototype.init = function() {
  this.field.typeahead({
    source: function(query, process) {
      this.service.getPlacePredictions({ input: query }, function(predictions, status) {
        if (status !== google.maps.places.PlacesServiceStatus.OK) {
          return App.log(status);
        }
        process($.map(predictions, function(prediction) {
          return prediction.description;
        }));
      });
    }.bind(this),
    updater: this.showSearchOnMap.bind(this)
  });
};

App.UI.PlacesSearch.prototype.showSearchOnMap = function(address) {
  this.geocoder.geocode({ address: address }, function(results, status) {
    if (status !== google.maps.GeocoderStatus.OK) {
      App.log(status);
      return window.alert('Location was not found. Please try again.');
    }
    this.map.setCenter(results[0].geometry.location);
    this.map.setZoom(12); 
  }.bind(this));
  return address;
};