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
  
  var input = this.ui.field[0];
  var map = App.Map.instance();
  var autocomplete = new google.maps.places.Autocomplete(input);

  autocomplete.bindTo('bounds', map);

  var infowindow = new google.maps.InfoWindow();
  var marker = new google.maps.Marker({
    map: map
  });

  google.maps.event.addListener(autocomplete, 'place_changed', function() {

    infowindow.close();
    marker.setVisible(false);

    var place = autocomplete.getPlace();
    if (!place.geometry) {
      // Inform the user that the place was not found and return.
      input.className = 'notfound';
      return;
    }

    // If the place has a geometry, then present it on a map.
    if (place.geometry.viewport) {
      map.fitBounds(place.geometry.viewport);
    } else {
      map.setCenter(place.geometry.location);
      map.setZoom(17);  // Why 17? Because it looks good.
    }
    var image = new google.maps.MarkerImage(
        place.icon,
        new google.maps.Size(71, 71),
        new google.maps.Point(0, 0),
        new google.maps.Point(17, 34),
        new google.maps.Size(35, 35));
    marker.setIcon(image);
    marker.setPosition(place.geometry.location);

    var address = '';
    if (place.address_components) {
      address = [
        (place.address_components[0] && place.address_components[0].short_name || ''),
        (place.address_components[1] && place.address_components[1].short_name || ''),
        (place.address_components[2] && place.address_components[2].short_name || '')
      ].join(' ');
    }

    infowindow.setContent('<div><strong>' + place.name + '</strong><br>' + address);
    infowindow.open(map, marker);
  });

  this.ui.show();
};

App.Map.Actions.Search.prototype.reset = function() {
  App.Map.Actions.Action.prototype.reset.apply(this, arguments);
  this.ui.reset();
}