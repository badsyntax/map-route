App.Map.Actions.AddRoute = function() {
  
  this.handlers = [];
  this.map = App.Map.instance();

  var polyOptions = {
    strokeColor: '#000000',
    strokeOpacity: 1.0,
    strokeWeight: 3,
    map: this.map,
    editable: false,
    icons: [{
      icon: {
        path: google.maps.SymbolPath.FORWARD_OPEN_ARROW
      },
      offset: '100%'
    }]
  };
  
  this.poly = new google.maps.Polyline(polyOptions);
  this.path = this.poly.getPath();
};

App.Map.Actions.AddRoute.prototype.execute = function() {

  if (!App.Map.markers.length) {
    App.UI.Modal.show('You need to add some pins before planning a route.');
  }

  this.bindEvents();
  this.map.setOptions({ 
    draggableCursor: 'default' 
  });
};

App.Map.Actions.AddRoute.prototype.bindEvents = function() {
  $.each(App.Map.markers, this.bindMarkerEvents.bind(this));
};

App.Map.Actions.AddRoute.prototype.toggleMarker = function(e, marker) {

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
  }
  if (add) {
    this.path.push(marker.getPosition());
  }
};

App.Map.Actions.AddRoute.prototype.bindMarkerEvents = function(i, marker) {

  console.log(marker);

  marker.setCursor('crosshair');
  marker.setDraggable(false);

  this.handlers.push(google.maps.event.addListener(marker, 'click', function(e) {
    this.toggleMarker(e, marker);
  }.bind(this)));
};

App.Map.Actions.AddRoute.prototype.reset = function() {
  this.map.setOptions({ 
    draggableCursor: null 
  });
  $.each(this.handlers, function(i, handler) {
    handler.remove();
  });
};