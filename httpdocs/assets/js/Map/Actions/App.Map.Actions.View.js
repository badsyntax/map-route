App.Map.Actions.View = function() {
  App.Map.Actions.Action.apply(this, arguments);
};

App.inherits(App.Map.Actions.View, App.Map.Actions.Action);

App.Map.Actions.View.prototype.execute = function() {
  App.Map.Actions.Action.prototype.execute.apply(this, arguments);
};

App.Map.Actions.View.prototype.bindEvents = function() {
  $.each(App.Map.Route.markers(), this.bindMarkerEvents.bind(this));
};

App.Map.Actions.View.prototype.bindMarkerEvents = function(i, marker) {

  marker.setCursor('pointer');
  marker.setDraggable(true);

  this.handlers.push(google.maps.event.addListener(marker, 'click', function(e) {
    this.toggleInfoWindow(e, marker);
  }.bind(this)));

  this.bindInfoWindowEvents(marker);
};

App.Map.Actions.View.prototype.bindInfoWindowEvents = function(marker) {

  var content = $(marker.infoWindow.getContent());

  // content.on('click.pin', 'a.remove-pin', function(e) {
  //   this.onRemoveMarkerClick.call(this, e, marker);
  // }.bind(this));
};

App.Map.Actions.View.prototype.toggleInfoWindow = function(e, marker) {
  if (!marker.infoWindow.getMap()) {
    marker.infoWindow.open(this.map, marker);
  } else {
    marker.infoWindow.close();
  }
};