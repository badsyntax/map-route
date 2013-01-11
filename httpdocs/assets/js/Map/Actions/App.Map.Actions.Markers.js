App.Map.Actions.Markers = function() {
  App.Map.Actions.Action.apply(this, arguments);
};

App.inherits(App.Map.Actions.Markers, App.Map.Actions.Action);

App.Map.Actions.Markers.prototype.execute = function() {
  App.Map.Actions.Action.prototype.execute.apply(this, arguments);
  App.Map.Route.resetMarkers();
  this.map.setOptions({ 
    draggableCursor: 'crosshair' 
  });
};

App.Map.Actions.Markers.prototype.bindEvents = function() {
  this.handlers.push(google.maps.event.addListener(this.map, 'click', this.onMapClick.bind(this)));
};

App.Map.Actions.Markers.prototype.addMarker = function(location) {
  App.Map.Route.addMarker(location)
};

App.Map.Actions.Markers.prototype.onMapClick = function(e) {
  this.addMarker(e.latLng); 
};

App.Map.Actions.Markers.prototype.reset = function() {

  App.Map.Actions.Action.prototype.reset.apply(this, arguments);

  this.map.setOptions({ 
    draggableCursor: null 
  });

  this.modal.container.off('.marker');
  
  $.each(App.Map.Route.markers(), function(i, marker) {
    $(marker.infoWindow.getContent()).off('.marker');
  });
};