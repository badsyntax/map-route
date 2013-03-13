App.Map.Actions.Markers = function() {
  App.Map.Actions.Action.apply(this, arguments);
};

App.Map.Actions.Markers.inherit(App.Map.Actions.Action, {
  execute: function() {
    App.Map.Actions.Action.prototype.execute.apply(this, arguments);
    App.Map.Route.resetMarkers();
    this.map.setOptions({ 
      draggableCursor: 'crosshair' 
    });
  },
  bindEvents: function() {
    this.handlers.push(google.maps.event.addListener(this.map, 'click', this.onMapClick.bind(this)));
  },
  addMarker: function(location) {
    App.Map.Route.addMarker(location);
  },
  onMapClick: function(e) {
    this.addMarker(e.latLng); 
  },
  reset: function() {

    App.Map.Actions.Action.prototype.reset.apply(this, arguments);

    this.map.setOptions({ 
      draggableCursor: null 
    });

    $.each(App.Map.Route.markers(), function(i, marker) {
      $(marker.infoWindow.getContent()).off('.marker');
    });
  }
});