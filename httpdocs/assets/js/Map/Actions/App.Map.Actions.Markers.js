App.Map.Actions.Markers = function() {
  App.Map.Actions.Action.apply(this, arguments);
  this.map = App.Map.instance();
  this.modal = App.UI.Modal;
};

App.inherits(App.Map.Actions.Markers, App.Map.Actions.Action);

App.Map.Actions.Markers.prototype.execute = function() {
  this.bindEvents();
  this.map.setOptions({ draggableCursor: 'crosshair' });
};

App.Map.Actions.Markers.prototype.bindEvents = function() {
  this.handlers.push(google.maps.event.addListener(this.map, 'click', this.onMapClick.bind(this)));
  $.each(App.Map.Route.markers(), this.bindMarkerEvents.bind(this));
  this.modal.container.on('submit.marker', 'form', this.saveDescription.bind(this));
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

  content.on('click.pin', 'a.remove-pin', function(e) {
    this.onRemoveMarkerClick.call(this, e, marker);
  }.bind(this));

  content.on('click.pin', 'a.add-description', function(e) {
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

App.Map.Actions.Markers.prototype.onRemoveMarkerClick = function(e, marker) {
  e.preventDefault();
  marker.remove();
};

App.Map.Actions.Markers.prototype.onAddDescriptionMarkerClick = function(e, marker) {
  
  e.preventDefault();
  this.curMarker = marker;

  App.UI.Modal.show('#modal-edit-marker', {
    heading: 'Edit marker',
    buttons: [{
      title: 'Save',
      action: this.saveDescription.bind(this),
      type: 'btn-primary'
    }, {
      title: 'Cancel',
      action: '',
      type: ''
    }]
  }, marker.model);
};

App.Map.Actions.Markers.prototype.onMapClick = function(e) {
  this.addMarker(e.latLng); 
};

App.Map.Actions.Markers.prototype.saveDescription = function(e) {

  if (e && e.preventDefault) {
    e.preventDefault();
  }

  var title = $('#inputTitle').val();
  var description = $('#inputDescription').val();

  var model = this.curMarker.model;
  model.title(title);
  model.description(description);
  model.save();

  App.UI.Modal.hide();

  // Refresh the infowindow dimensions
  var infoWindow = this.curMarker.infoWindow;
  infoWindow.setContent(infoWindow.getContent());
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