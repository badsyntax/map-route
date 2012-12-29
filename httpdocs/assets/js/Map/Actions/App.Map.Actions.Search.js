App.Map.Actions.Search = function() {
  App.Map.Actions.Action.apply(this, arguments);
  this.container = $('#search');
  this.initViewModel();
  this.ui = this.viewModel.ui;
 };

App.inherits(App.Map.Actions.Search, App.Map.Actions.Action);

App.Map.Actions.Search.prototype.initViewModel = function() {
  this.viewModel = new App.ViewModels.Search(this.container);
  ko.applyBindings(this.viewModel, this.container[0]);
  this.viewModel.rendered();
};

App.Map.Actions.Search.prototype.execute = function() {

  this.ui.show();
  
  var service = new google.maps.places.AutocompleteService();
  var geocoder = new google.maps.Geocoder();
  var map = App.Map.instance();

  $(this.ui.field).typeahead({
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

App.Map.Actions.Search.prototype.reset = function() {
  App.Map.Actions.Action.prototype.reset.apply(this, arguments);
  this.ui.reset();
};