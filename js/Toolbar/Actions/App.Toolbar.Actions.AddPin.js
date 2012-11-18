App.Toolbar.Actions.AddPin = function() {
  this.map = App.Map.instance();
  this.handlers = [];
};

App.Toolbar.Actions.AddPin.prototype.execute = function() {
  this.bindEvents();
  this.map.setOptions({ draggableCursor: 'crosshair' });
};

App.Toolbar.Actions.AddPin.prototype.bindEvents = function() {
  this.handlers.push(google.maps.event.addListener(this.map, 'click', this.onMapClick.bind(this)));
};

App.Toolbar.Actions.AddPin.prototype.reset = function() {
  this.map.setOptions({ draggableCursor: null });
  $.each(this.handlers, function(i, handler) {
    handler.remove();
  });
};

App.Toolbar.Actions.AddPin.prototype.onMapClick = function(e) {
  this.placeMarker(e.latLng);
};

App.Toolbar.Actions.AddPin.prototype.placeMarker = function(location) {
  
  var infowindow = new google.maps.InfoWindow({
    content: '<p><em>No description.</em></p><p><a href="#">Add description &raquo;</a></p>'
  });

  var marker = new google.maps.Marker({
      position: location,
      map: this.map,
      draggable: true,
      animation: null // google.maps.Animation.DROP | BOUNCE
  });
  
  google.maps.event.addListener(marker, 'click', function() {
    infowindow.open(this.map, marker);
  }.bind(this));
  
  App.Map.markers.push(marker);
};