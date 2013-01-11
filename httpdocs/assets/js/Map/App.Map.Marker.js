App.Map.Marker = function(data) {

  var map = App.Map.instance();
  var marker = this.createMarker(map, data);

  ko.applyBindings(marker.model, marker.infoWindow.getContent());

  return $.extend(marker, {
    focus: function() {
      App.Map.Route.resetMarkers();
      marker.infoWindow.open(map, marker);
    },
    remove: function() {
      App.Map.Route.removeMarker(marker, true, true);      
    }.bind(this)
  });
};

App.Map.Marker.prototype.createMarker = function(map, data) {

  var type = App.Config.get('action'); // view|edit
  var infoWindow = new App.Map.InfoWindow(type);
  
  var marker = new google.maps.Marker({
      infoWindow: infoWindow,
      position: data.location,
      map: map,
      draggable: false,
      clickable: false,
      animation: google.maps.Animation.DROP // google.maps.Animation.DROP | BOUNCE
  });
  App.Map.Route.markers().push(marker);

  marker.model = this.createModel(marker, data);

  this.bindEvents(marker);

  return marker;
};

App.Map.Marker.prototype.createModel = function(marker, data) {
  
  if (data.model) {
    return data.model;
  }

  var model = new App.Models.Marker();

  model.values({
    user_id: App.Config.get('user_id'),
    latitude: data.location.lat(),
    longitude: data.location.lng(),
    title: '',
    description: '',
    route_id: App.Map.Route.model().id,
    route_order: -1
  });

  model.save(data.success, data.error);

  return model;
};

App.Map.Marker.prototype.bindEvents = function(marker) {
  
  marker.setCursor('pointer');
  marker.setDraggable(true);

  this.handlers = [];

  this.handlers.push(google.maps.event.addListener(marker, 'click', function(e) {
    this.toggleInfoWindow(e, marker);
  }.bind(this)));

  this.handlers.push(google.maps.event.addListener(marker, 'dragend', function(e) {
    this.onMarkerDragEnd(e, marker);
  }.bind(this)));

  this.bindInfoWindowEvents(marker);
};

App.Map.Marker.prototype.onMarkerDragEnd = function(e, marker) {

  marker.model.values({
    longitude: marker.getPosition().lng(),
    latitude: marker.getPosition().lat()
  }).save();

  App.Map.Route.updatePoint(marker);
};

App.Map.Marker.prototype.bindInfoWindowEvents = function(marker) {

  var content = $(marker.infoWindow.getContent());

  content.on('click.pin', 'a.remove-pin', function(e) {
    this.onRemoveMarkerClick.call(this, e, marker);
  }.bind(this));

  content.on('click.pin', 'a.add-description', function(e) {
    this.onAddDescriptionMarkerClick.call(this, e, marker);
  }.bind(this));
};

App.Map.Marker.prototype.toggleInfoWindow = function(e, marker) {
  if (!marker.infoWindow.getMap()) {
    App.Map.Route.resetMarkers();
    marker.infoWindow.open(App.Map.instance(), marker);
  } else {
    marker.infoWindow.close();
  }
};

App.Map.Marker.prototype.onRemoveMarkerClick = function(e, marker) {
  e.preventDefault();
  marker.remove();
};

App.Map.Marker.prototype.onAddDescriptionMarkerClick = function(e, marker) {
  
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

App.Map.Marker.prototype.saveDescription = function(e) {

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