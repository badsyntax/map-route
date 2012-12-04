App.Map.Route = (function() {

  var markers;
  var model;
  var poly;
  var path;

  var route = {
    markers: function() {
      return markers;
    },
    poly: function() {
      return poly;
    },
    path: function() {
      return path;
    },
    model: function() {
      return model;
    },
    init: function() {
      poly = new google.maps.Polyline(App.Config.get('polyOptions'));
      path = poly.getPath();
      this.load(function() {
        this.loadMarkers();
      }.bind(this));
    },
    load: function(callback) {

      new App.Models.Route().findAll(function(data) {
    
        model = new App.Models.Route(data.routes[0]);

        // Create a new route for the user
        if (!model.id || !model.id()) {
          model.title = 'Default route';
          return model.save(callback);
        }

        callback();
      });
    },
    loadMarkers: function() {
      new App.Models.Marker().findAll(this.model().id(), function() {
        markers = this.markers();
      });
    },
    addMarkers: function() {
      markers = $.map(markers, function(marker) {
        return new App.Map.Marker({
          model: marker,
          location: new google.maps.LatLng(marker.latitude(), marker.longitude())
        });
      }.bind(this));
    },
    removeMarker: function(marker) {

      marker.model.remove();
      marker.infoWindow.close();
      marker.setMap(null);

      this.markers = $.map(this.markers, function(m) {
        return m === marker ? null : m;
      });
    },
    addPath: function() {

      markers.sort(function(a, b) {
        var a_route_order = a.model.route_order();
        var b_route_order = a.model.route_order();
        return (a_route_order < b_route_order ? -1 : (a_route_order > b_route_order ? 1 : 0));
      });

      $.map(markers, function(marker) {
        if (marker.model.route_order() >= 0) {
          path.push(marker.getPosition());
        }
      });
    },
    updatePath: function(marker) {
      path.clear();
      this.addPath();
    }
  };

  return route;
}());