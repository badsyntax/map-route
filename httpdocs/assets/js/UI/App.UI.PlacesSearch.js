App.UI.PlacesSearch = function(field) {
  this.field = field;
  this.predictions = null;
  this.map = App.Map.instance();
  this.init();
};

App.UI.PlacesSearch.prototype.init = function() {
  this.initServices();
  this.initAutocomplete();
};

App.UI.PlacesSearch.prototype.initServices = function() {
  this.autocomplete = new google.maps.places.AutocompleteService();
  this.places = new google.maps.places.PlacesService(this.map);
};

App.UI.PlacesSearch.prototype.initAutocomplete = function() {
  this.field.typeahead({
    source: this.getPredictions.bind(this),
    updater: this.selectAddress.bind(this)
  });
};

App.UI.PlacesSearch.prototype.getPredictions = function(query, process) {
  this.autocomplete.getPlacePredictions({ input: query }, function(predictions, status) {
    if (status !== google.maps.places.PlacesServiceStatus.OK) {
      return App.log(status);
    }
    this.predictions = predictions;
    process($.map(predictions, function(prediction) {
      return prediction.description;
    }));
  }.bind(this));
};

App.UI.PlacesSearch.prototype.selectAddress = function(address) {

  var reference;
  $.each(this.predictions, function(i, prediction) {
    if (address === prediction.description) {
      reference = prediction.reference;
      return false;
    }
  });

  this.field.focus();
  this.places.getDetails({ reference: reference }, this.showSearchOnMap.bind(this));

  return address;
};

App.UI.PlacesSearch.prototype.showSearchOnMap = function(result, status) {
  if (status !== google.maps.GeocoderStatus.OK) {
    App.log(status);
    return window.alert('Location was not found. Please try again.');
  }
  this.map.setCenter(result.geometry.location);
  this.map.setZoom(12); 
};