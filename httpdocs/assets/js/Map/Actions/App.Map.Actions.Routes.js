App.Map.Actions.Routes = function() {
  this.handlers = [];
  this.map = App.Map.instance();
  this.poly = App.Map.Route.poly();
  this.path = App.Map.Route.path();
};

App.Map.Actions.Routes.prototype.execute = function() {

  if (!App.Map.Route.markers().length) {
    return App.UI.Modal.show('You need to add some pins before planning a route.');
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
  var add = true;

  $.each(points, function(i, point) {
    if (point === position) {
      add = false;
      remove = (i === lastIndex);
      return false;
    }
  });

  if (remove) {
    this.path.removeAt(lastIndex);
    marker.model.values({
      route_order: -1
    }).save();
  }
  if (add) {
    this.path.push(marker.getPosition());
    marker.model.values({
      route_order: this.path.getArray().length
    }).save();
  }

  App.Map.Route.updatePath(this.getPath());
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
  this.map.setOptions({ 
    draggableCursor: null 
  });
  $.each(this.handlers, function(i, handler) {
    handler.remove();
  });
};