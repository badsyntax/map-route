App.Map.Actions.Routes = function() {
  App.Map.Actions.Action.apply(this, arguments);
  this.map = App.Map.instance();
  this.poly = App.Map.Route.poly();
  this.path = App.Map.Route.path();
};

App.inherits(App.Map.Actions.Routes, App.Map.Actions.Action);

App.Map.Actions.Routes.prototype.execute = function() {

  if (!App.Map.Route.markers().length) {
    return App.UI.Modal.message('You need to add some pins before planning a route.');
  }

  this.bindEvents();
  this.map.setOptions({ 
    draggableCursor: 'default' 
  });
};

App.Map.Actions.Routes.prototype.bindEvents = function() {
  $.each(App.Map.Route.markers(), this.bindMarkerEvents.bind(this));
};

App.Map.Actions.Routes.prototype.bindMarkerEvents = function(i, marker) {

  marker.setClickable(true);
  marker.setCursor('crosshair');
  marker.setDraggable(false);

  this.handlers.push(google.maps.event.addListener(marker, 'click', function(e) {
    this.toggleMarker(e, marker);
  }.bind(this)));
};

App.Map.Actions.Routes.prototype.toggleMarker = function(e, marker) {

  var position = marker.getPosition();
  var points = this.path.getArray();
  var lastIndex = this.path.getLength() - 1;
  var remove = false;

  $.each(points, function(i, point) {
    if (point === position) {
      remove = (i === lastIndex);
      return false;
    }
  });

  if (remove) {
    App.Map.Route.removePoint(marker);
  } else {
    App.Map.Route.addPoint(marker, this.path.getArray().length);
  }
};

App.Map.Actions.Routes.prototype.getPath = function() {
  return $.map(this.path.getArray(), function(position) {
    return {
      lat: position.lat(),
      lng: position.lng()
    };
  });
};

App.Map.Actions.Routes.prototype.reset = function() {
  App.Map.Actions.Action.prototype.reset.apply(this, arguments);
  this.map.setOptions({ 
    draggableCursor: null 
  });
};