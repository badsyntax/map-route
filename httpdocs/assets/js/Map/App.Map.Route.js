App.Map.Route = (function() {

  var markers = ko.observableArray();
  var points  = ko.observableArray();
  var model   = ko.observable();
  var poly    = ko.observable();
  var path    = ko.observable();

  var route = {
    
    markers: markers,
    poly:    poly,
    path:    path,
    model:   model,
    points:  points,

    init: function() {
      poly(new google.maps.Polyline(App.Config.get('polyOptions')));
      path(poly().getPath());
      this.load(function() {
        this.loadMarkers();
      }.bind(this));
    },
    load: function(callback) {

      new App.Models.Route().findAll(function(data) {
    
        model(new App.Models.Route(data.routes[0]));

        // Create a new route for the user
        if (!model().id || !model().id()) {
          model().title('Default route');
          return model().save(callback);
        }

        callback();
      });
    },
    loadMarkers: function() {
      new App.Models.Marker().findAll(model().id(), function() {
        markers(this.markers());
      });
    },
    addMarkers: function() {
      markers($.map(markers(), function(marker) {
        return new App.Map.Marker({
          model: marker,
          location: new google.maps.LatLng(
            marker.latitude(), 
            marker.longitude()
          )
        });
      }.bind(this)));
    },
    removeMarker: function(marker) {

      marker.model.remove();
      marker.infoWindow.close();
      marker.setMap(null);

      markers($.map(this.markers, function(m) {
        return m === marker ? null : m;
      }));
    },
    removePoint: function(marker) {
      
      $.each(points(), function(i, point) {
        if (marker === point) {
          path().removeAt(i);
          points.splice(i, 1);
          return false;
        }
      });
      
      marker.model.values({
        route_order: -1
      }).save();
    },
    addPoint: function(marker, routeOrder) {
      
      path().push(marker.getPosition());
      points.push(marker);

      marker.model.values({
        route_order: routeOrder 
      }).save();
    },
    updatePoint: function(marker) {
      $.each(points(), function(i, point) {
        if (marker === point) {
          var pos = marker.getPosition();
          path().setAt(i, pos);
          points()[i] = pos;
          return false;
        }
      });
    },
    addPath: function() {

      markers().sort(function(a, b) {
        var a_route_order = a.model.route_order();
        var b_route_order = a.model.route_order();
        return (a_route_order < b_route_order ? -1 : (a_route_order > b_route_order ? 1 : 0));
      });

      $.map(markers(), function(marker) {
        if (marker.model.route_order() >= 0) {
          points.push(marker);
        }
      });

      $.each(points(), function(i, point) {
        path().push(point.getPosition());
      });
    }    
  };

  return route;
}());