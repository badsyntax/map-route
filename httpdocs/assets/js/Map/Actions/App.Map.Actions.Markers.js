App.Map.Actions.Markers = function() {
  this.map = App.Map.instance();
  this.modal = App.UI.Modal.EditMarkerDescription;
  this.handlers = [];
};

App.Map.Actions.Markers.prototype.execute = function() {
  this.bindEvents();
  this.map.setOptions({ draggableCursor: 'crosshair' });
};

App.Map.Actions.Markers.prototype.bindEvents = function() {
  this.handlers.push(google.maps.event.addListener(this.map, 'click', this.onMapClick.bind(this)));
  $.each(App.Map.Route.markers(), this.bindMarkerEvents.bind(this));
  this.modal.on('save', this.onDescriptionSave.bind(this));
};

App.Map.Actions.Markers.prototype.bindMarkerEvents = function(i, marker) {

  marker.setCursor('pointer');
  marker.setDraggable(true);

  this.handlers.push(google.maps.event.addListener(marker, 'click', function(e) {
    this.toggleInfoWindow(e, marker);
  }.bind(this)));

  this.handlers.push(google.maps.event.addListener(marker, 'dragend', function(e) {
    this.onMarkerDragEnd(e, marker);
  }.bind(this)));

  this.bindInfoWindowEvents(marker);
};

App.Map.Actions.Markers.prototype.onMarkerDragEnd = function(e, marker) {

  marker.model.values({
    longitude: marker.getPosition().lng(),
    latitude: marker.getPosition().lat()
  }).save();

  App.Map.Route.updatePoint(marker);
};

App.Map.Actions.Markers.prototype.bindInfoWindowEvents = function(marker) {

  var content = $(marker.infoWindow.getContent());

  content.on('click', 'a.remove-pin', function(e) {
    this.onRemoveMarkerClick.call(this, e, marker);
  }.bind(this));

  content.on('click', 'a.add-description', function(e) {
    this.onAddDescriptionMarkerClick.call(this, e, marker);
  }.bind(this));
};

App.Map.Actions.Markers.prototype.toggleInfoWindow = function(e, marker) {
  if (!marker.infoWindow.getMap()) {
    marker.infoWindow.open(this.map, marker);
  } else {
    marker.infoWindow.close();
  }
};

App.Map.Actions.Markers.prototype.addMarker = function(location) {
  this.bindMarkerEvents(null, new App.Map.Marker({
    location: location
  }));
};

App.Map.Actions.Markers.prototype.reset = function() {
  
  this.map.setOptions({ draggableCursor: null });
  
  $.each(this.handlers, function(i, handler) {
    handler.remove();
  });

  this.modal.off('save');
  
  $.each(App.Map.Route.markers(), function(i, marker) {
    $(marker.infoWindow.getContent()).off('click');
  });
};

App.Map.Actions.Markers.prototype.onRemoveMarkerClick = function(e, marker) {
  e.preventDefault();
  marker.remove();
};

App.Map.Actions.Markers.prototype.onAddDescriptionMarkerClick = function(e, marker) {
  e.preventDefault();
  this.curMarker = marker;
  this.modal.show();
  this.modal.controller.viewModel.title(marker.model.title());
  this.modal.controller.viewModel.description(marker.model.description());
};

App.Map.Actions.Markers.prototype.onMapClick = function(e) {
  this.addMarker(e.latLng);
};

App.Map.Actions.Markers.prototype.onDescriptionSave = function(e) {

  var title = $('#inputTitle').val();
  var description = $('#inputDescription').val();

  var model = this.curMarker.model;
  model.title(title);
  model.description(description);
  model.save();

  this.modal.hide();

  // Refresh the infowindow dimensions
  var infoWindow = this.curMarker.infoWindow;
  infoWindow.setContent(infoWindow.getContent());
};