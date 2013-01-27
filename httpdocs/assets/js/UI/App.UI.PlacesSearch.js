App.UI.PlacesSearch = function(field) {
  App.Events.call(this);
  this.field = field;
  this.predictions = null;
  this.map = App.Map.instance();
  this.init();
};

App.UI.PlacesSearch.prototype = Object.inherits(App.Events, {
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
        return App.log(status);
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
      this.trigger('onAddressSelect', [ result, status ]);
      // this.showSearchOnMap.bind(this));
    }.bind(this));

    return address;
  }
});