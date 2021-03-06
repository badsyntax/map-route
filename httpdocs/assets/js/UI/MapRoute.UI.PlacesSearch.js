MapRoute.UI.PlacesSearch = function(field) {
  MapRoute.Events.call(this);
  this.field = field;
  this.predictions = null;
  this.map = MapRoute.Map.instance();
  this.init();
};

MapRoute.UI.PlacesSearch.inherit(MapRoute.Events, {
  init: function() {
    this.initServices();
    this.initAutocomplete();
  },
  initServices: function() {
    this.autocomplete = new google.maps.places.AutocompleteService();
    this.places = new google.maps.places.PlacesService(this.map);
  },
  initAutocomplete: function() {
    this.field.typeahead({
      source: this.getPredictions.bind(this),
      updater: this.selectAddress.bind(this)
    });
  },
  getPredictions: function(query, process) {
    this.autocomplete.getPlacePredictions({ input: query }, function(predictions, status) {
      if (status !== google.maps.places.PlacesServiceStatus.OK) {
        return MapRoute.log(status);
      }
      this.predictions = predictions;
      process($.map(predictions, function(prediction) {
        return prediction.description;
      }));
    }.bind(this));
  },
  selectAddress: function(address) {

    var reference;
    $.each(this.predictions, function(i, prediction) {
      if (address === prediction.description) {
        reference = prediction.reference;
        return false;
      }
    });

    this.field.focus();
    this.places.getDetails({ reference: reference }, function(result, status) {
      this.trigger('onAddressSelect', arguments);
    }.bind(this));

    return address;
  }
});