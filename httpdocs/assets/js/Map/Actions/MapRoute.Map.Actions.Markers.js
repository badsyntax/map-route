MapRoute.Map.Actions.Markers = function() {
  MapRoute.Map.Actions.Action.apply(this, arguments);
};

MapRoute.Map.Actions.Markers.inherit(MapRoute.Map.Actions.Action, {
  execute: function() {
    MapRoute.Map.Actions.Action.prototype.execute.apply(this, arguments);
    MapRoute.Map.Route.resetMarkers();
    this.map.setOptions({
      draggableCursor: 'crosshair'
    });
  },
  bindEvents: function() {
    this.handlers.push(google.maps.event.addListener(this.map, 'click', this.onMapClick.bind(this)));
  },
  addMarker: function(location) {
    MapRoute.Map.Route.addMarker(location);
  },
  onMapClick: function(e) {
    this.addMarker(e.latLng);
  },
  reset: function() {

    MapRoute.Map.Actions.Action.prototype.reset.apply(this, arguments);

    this.map.setOptions({
      draggableCursor: null
    });

    $.each(MapRoute.Map.Route.markers(), function(i, marker) {
      $(marker.infoWindow.getContent()).off('.marker');
    });
  }
});