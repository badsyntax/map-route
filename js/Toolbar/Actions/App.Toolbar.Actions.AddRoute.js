App.Toolbar.Actions.AddRoute = function() {
  
  this.handlers = [];
  this.map = App.Map.instance();
  this.lastMarker = -1;

  var lineSymbol = {
    path: google.maps.SymbolPath.FORWARD_OPEN_ARROW
  };

  var polyOptions = {
    strokeColor: '#000000',
    strokeOpacity: 1.0,
    strokeWeight: 3,
    map: this.map,
    editable: false,
    icons: [{
      icon: lineSymbol,
      offset: '100%'
    }]
  };
  
  this.poly = new google.maps.Polyline(polyOptions);
};

App.Toolbar.Actions.AddRoute.prototype.execute = function() {
  this.bindEvents();
  this.map.setOptions({ draggableCursor: 'crosshair' });
};

App.Toolbar.Actions.AddRoute.prototype.bindEvents = function() {
  
  var path = this.poly.getPath();

  $.each(App.Map.markers, function(i, marker) {
    (function(i, marker) {
      
      var handler = google.maps.event.addListener(marker, 'click', function(e) {
        if (marker.poly === this.lastMarker) {
          path.removeAt(marker.poly);
          this.lastMarker--;
          marker.poly = false;
        } else if (!marker.poly && marker.poly !== 0) {
          path.push(e.latLng);
          this.lastMarker++;
          marker.poly = this.lastMarker;
        }
      }.bind(this));
      
      this.handlers.push(handler);
    
    }.bind(this)(i, marker));
  }.bind(this));
};

App.Toolbar.Actions.AddRoute.prototype.addLine = function(e) {
  var path = this.poly.getPath();
  path.push(e.latLng);
};

App.Toolbar.Actions.AddRoute.prototype.reset = function() {
  this.map.setOptions({ draggableCursor: null });
  $.each(this.handlers, function(i, handler) {
    handler.remove();
  });
};