MapRoute.Map.Actions.Route = function() {
  MapRoute.Map.Actions.Action.apply(this, arguments);
  this.poly = MapRoute.Map.Route.poly();
  this.path = MapRoute.Map.Route.path();
};

MapRoute.Map.Actions.Route.inherit(MapRoute.Map.Actions.Action, {
  execute: function() {

    if (!MapRoute.Map.Route.markers().length) {
      return MapRoute.UI.Modal.message('You need to add some pins before planning a route.');
    }

    MapRoute.Map.Actions.Action.prototype.execute.call(this);

    this.map.setOptions({
      draggableCursor: 'default'
    });
  },
  bindEvents: function() {
    $.each(MapRoute.Map.Route.markers(), this.bindMarkerEvents.bind(this));
  },
  bindMarkerEvents: function(i, marker) {

    marker.setClickable(true);
    marker.setCursor('crosshair');
    marker.setDraggable(false);

    this.handlers.push(google.maps.event.addListener(marker, 'click', function() {
      this.toggleMarker(marker);
    }.bind(this)));
  },
  toggleMarker: function(marker) {

    var position = marker.getPosition();
    var points = this.path.getArray();
    var lastIndex = this.path.getLength() - 1;
    var remove = false;
    var add = true;

    $.each(points, function(i, point) {
      if (point === position) {
        add = false;
        remove = (i === lastIndex);
        return false;
      }
    });

    if (remove) {
      MapRoute.Map.Route.removePoint(marker);
    }
    if (add) {
      MapRoute.Map.Route.addPoint(marker, this.path.getArray().length);
    }
  },
  getPath: function() {
    return $.map(this.path.getArray(), function(position) {
      return {
        lat: position.lat(),
        lng: position.lng()
      };
    });
  },
  reset: function() {
    MapRoute.Map.Actions.Action.prototype.reset.apply(this, arguments);
    this.map.setOptions({
      draggableCursor: null
    });
  }
});