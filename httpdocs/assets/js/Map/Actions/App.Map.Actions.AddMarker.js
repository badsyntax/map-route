App.Map.Actions.AddMarker = function() {
  this.map = App.Map.instance();
  this.handlers = [];
  this.infoWindowTemplate = $('#map-infowindow-template').html();
};

App.Map.Actions.AddMarker.prototype.execute = function() {
  this.bindEvents();
  this.map.setOptions({ draggableCursor: 'crosshair' });
};

App.Map.Actions.AddMarker.prototype.bindEvents = function() {
  this.handlers.push(google.maps.event.addListener(this.map, 'click', this.onMapClick.bind(this)));
  $.each(App.Map.markers, this.bindMarkerEvents.bind(this));
};

App.Map.Actions.AddMarker.prototype.bindMarkerEvents = function(i, marker) {

  marker.setCursor('pointer');
  marker.setDraggable(true);

  this.handlers.push(google.maps.event.addListener(marker, 'click', function(e) {
    this.toggleInfoWindow(e, marker);
  }.bind(this)));
};

App.Map.Actions.AddMarker.prototype.bindInfoWindowEvents = function(content, marker) {
  
  content.on('click', 'a.remove-pin', function(e) {
    this.onRemoveMarkerClick.call(this, e, marker);
  }.bind(this));

  content.on('click', 'a.add-description', function(e) {
    this.onAddDescriptionMarkerClick.call(this, e, marker);
  }.bind(this));
};

App.Map.Actions.AddMarker.prototype.toggleInfoWindow = function(e, marker) {
  if (!marker.infoWindow.getMap()) {
    marker.infoWindow.open(this.map, marker);
  } else {
    marker.infoWindow.close();
  }
};

App.Map.Actions.AddMarker.prototype.addMarker = function(model, location) {

  var infoWindowContent = $(this.infoWindowTemplate);

  var marker = new App.Map.Marker({
    model: model,
    location: location,
    infoWindowContent: infoWindowContent
  });
  
  this.bindMarkerEvents(null, marker);
  this.bindInfoWindowEvents(infoWindowContent, marker);
};

App.Map.Actions.AddMarker.prototype.addMarkers = function(pins) {
  $.each(pins, function(i, pin) {
    setTimeout(function() {
      this.addMarker(pin, new google.maps.LatLng(pin.latitude(), pin.longitude()));
    }.bind(this), i * 100);
  }.bind(this));
};

App.Map.Actions.AddMarker.prototype.reset = function() {
  this.map.setOptions({ draggableCursor: null });
  $.each(this.handlers, function(i, handler) {
    handler.remove();
  });
};

App.Map.Actions.AddMarker.prototype.onRemoveMarkerClick = function(e, marker) {
  e.preventDefault();
  marker.infoWindow.close();
  marker.setMap(null);
};

App.Map.Actions.AddMarker.prototype.onAddDescriptionMarkerClick = function(e, infoWindow, marker) {
  e.preventDefault();
  alert('Add description');
};

App.Map.Actions.AddMarker.prototype.onMapClick = function(e) {
  console.log(e.latLng);
  this.addMarker(null, e.latLng);
};