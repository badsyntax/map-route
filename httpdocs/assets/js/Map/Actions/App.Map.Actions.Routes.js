App.Map.Actions.Routes = function() {
  App.Map.Actions.Action.apply(this, arguments);
  this.poly = App.Map.Route.poly();
  this.path = App.Map.Route.path();
};

App.Map.Actions.Routes.inherit(App.Map.Actions.Action, {
  execute: function() {

    if (!App.Map.Route.markers().length) {
      return App.UI.Modal.message('You need to add some pins before planning a route.');
    }

    App.Map.Actions.Action.prototype.execute.call(this);

    this.map.setOptions({ 
      draggableCursor: 'default' 
    });
  },
  bindEvents: function() {
    $.each(App.Map.Route.markers(), this.bindMarkerEvents.bind(this));
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
      App.Map.Route.removePoint(marker);
    }
    if (add) {
      App.Map.Route.addPoint(marker, this.path.getArray().length);
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
    App.Map.Actions.Action.prototype.reset.apply(this, arguments);
    this.map.setOptions({ 
      draggableCursor: null 
    });
  }
});