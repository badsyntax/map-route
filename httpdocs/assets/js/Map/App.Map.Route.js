App.Map.Route = (function() {

  var markers;
  var model;
  var poly;
  var path;
  var points = [];

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
    removePoint: function(marker) {
      $.each(points, function(i, point) {
        if (marker === point) {
          path.removeAt(i);
          points.splice(i, 1);
          return false;
        }
      });
    },
    addPoint: function(marker) {
      path.push(marker.getPosition());
      points.push(marker);
    },
    updatePoint: function(marker) {
      $.each(points, function(i, point) {
        if (marker === point) {
          var pos = marker.getPosition();
          path.setAt(i, pos);
          points[i] = pos;
          return false;
        }
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
          points.push(marker);
        }
      });

      $.each(points, function(i, point) {
        path.push(point.getPosition());
      });
    }    
  };

  return route;
}());