App.Map.Actions.AddMarker = function() {
  this.map = App.Map.instance();
  this.modal = App.UI.Modal.EditMarkerDescription;
  this.handlers = [];
};

App.Map.Actions.AddMarker.prototype.execute = function() {
  this.bindEvents();
  this.map.setOptions({ draggableCursor: 'crosshair' });
};

App.Map.Actions.AddMarker.prototype.bindEvents = function() {
  this.handlers.push(google.maps.event.addListener(this.map, 'click', this.onMapClick.bind(this)));
  $.each(App.Map.markers, this.bindMarkerEvents.bind(this));
  this.modal.on('save', this.onDescriptionSave.bind(this));
};

App.Map.Actions.AddMarker.prototype.bindMarkerEvents = function(i, marker) {

  marker.setCursor('pointer');
  marker.setDraggable(true);

  this.handlers.push(google.maps.event.addListener(marker, 'click', function(e) {
    this.toggleInfoWindow(e, marker);
  }.bind(this)));

  this.handlers.push(google.maps.event.addListener(marker, 'dragend', function(e) {
    marker.model.values({
      longitude: marker.getPosition().lng(),
      latitude: marker.getPosition().lat()
    });
    marker.model.save();
  }.bind(this)));

  this.bindInfoWindowEvents(marker);
};

App.Map.Actions.AddMarker.prototype.bindInfoWindowEvents = function(marker) {

  var content = $(marker.infoWindow.getContent());

  content.on('click', 'a.remove-pin', function(e) {
    this.onRemoveMarkerClick.call(this, e, marker);
  }.bind(this));

  content.on('click', 'a.add-description', function(e) {
    this.onAddDescriptionMarkerClick.call(this, e, marker);
  }.bind(this));
};

App.Map.Actions.AddMarker.prototype.toggleInfoWindow = function(e, marker) {
  this.curMarker = marker;
  if (!marker.infoWindow.getMap()) {
    marker.infoWindow.open(this.map, marker);
  } else {
    marker.infoWindow.close();
  }
};

App.Map.Actions.AddMarker.prototype.addMarker = function(location) {
  this.bindMarkerEvents(null, new App.Map.Marker({
    location: location
  }));
};

App.Map.Actions.AddMarker.prototype.reset = function() {
  
  this.map.setOptions({ draggableCursor: null });
  
  $.each(this.handlers, function(i, handler) {
    handler.remove();
  });

  this.modal.off('save');
  
  $.each(App.Map.markers, function(i, marker) {
    $(marker.infoWindow.getContent()).off('click');
  });
};

App.Map.Actions.AddMarker.prototype.onRemoveMarkerClick = function(e, marker) {
  e.preventDefault();
  marker.model.remove();
  marker.infoWindow.close();
  marker.setMap(null);
};

App.Map.Actions.AddMarker.prototype.onAddDescriptionMarkerClick = function(e, infoWindow, marker) {
  e.preventDefault();
  this.modal.show();
};

App.Map.Actions.AddMarker.prototype.onMapClick = function(e) {
  this.addMarker(e.latLng);
};

App.Map.Actions.AddMarker.prototype.onDescriptionSave = function(e) {
  var title = $('#inputTitle').val();
  var description = $('#inputDescription').val();
  alert('description save');
};