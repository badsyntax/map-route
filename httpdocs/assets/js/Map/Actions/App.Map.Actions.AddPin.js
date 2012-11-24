App.Map.Actions.AddPin = function() {
  this.map = App.Map.instance();
  this.handlers = [];
  this.infoWindowTemplate = $('#map-infowindow-template').html();
};

App.Map.Actions.AddPin.prototype.execute = function() {
  this.bindEvents();
  this.map.setOptions({ draggableCursor: 'crosshair' });
};

App.Map.Actions.AddPin.prototype.bindEvents = function() {
  this.handlers.push(google.maps.event.addListener(this.map, 'click', this.onMapClick.bind(this)));
  $.each(App.Map.markers, this.bindMarkerEvents.bind(this));
};

App.Map.Actions.AddPin.prototype.bindMarkerEvents = function(i, marker) {

  marker.setCursor('pointer');
  marker.setDraggable(true);

  this.handlers.push(google.maps.event.addListener(marker, 'click', function(e) {
    this.toggleInfoWindow(e, marker);
  }.bind(this)));
};

App.Map.Actions.AddPin.prototype.bindInfoWindowEvents = function(content, marker) {
  
  content.on('click', 'a.remove-pin', function(e) {
    this.onRemovePinClick.call(this, e, marker);
  }.bind(this));

  content.on('click', 'a.add-description', function(e) {
    this.onAddDescriptionPinClick.call(this, e, marker);
  }.bind(this));
};

App.Map.Actions.AddPin.prototype.toggleInfoWindow = function(e, marker) {
  if (!marker.infoWindow.getMap()) {
    marker.infoWindow.open(this.map, marker);
  } else {
    marker.infoWindow.close();
  }
};

App.Map.Actions.AddPin.prototype.placeMarker = function(location) {
  
  var infoWindowContent = $(this.infoWindowTemplate);

  var marker = new App.Map.Marker({
    location: location,
    infoWindowContent: infoWindowContent
  });
  
  this.bindMarkerEvents(null, marker);
  this.bindInfoWindowEvents(infoWindowContent, marker);
};

App.Map.Actions.AddPin.prototype.reset = function() {
  this.map.setOptions({ draggableCursor: null });
  $.each(this.handlers, function(i, handler) {
    handler.remove();
  });
};

App.Map.Actions.AddPin.prototype.onRemovePinClick = function(e, marker) {
  e.preventDefault();
  marker.infoWindow.close();
  marker.setMap(null);
};

App.Map.Actions.AddPin.prototype.onAddDescriptionPinClick = function(e, infoWindow, marker) {
  e.preventDefault();
  alert('Add description');
};

App.Map.Actions.AddPin.prototype.onMapClick = function(e) {
  this.placeMarker(e.latLng);
};