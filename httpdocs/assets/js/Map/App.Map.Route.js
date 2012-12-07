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

    init: function(route_id, callback) {
      poly(new google.maps.Polyline(App.Config.get('polyOptions')));
      path(poly().getPath());
      this.load(route_id, function() {
        this.loadMarkers(callback);
      }.bind(this));
    },
    load: function(route_id, callback) {

      new App.Models.Route().findAll(function(data) {

        var route = data.routes[0] || { id: 0, title: '' };
        model(new App.Models.Route(route));

        if (this.loaded()) {
          callback()
        } else if (route_id === 'new') {
          this.create('Default route');
        } else {
          App.Router.push('');
        }
      }.bind(this));
    },
    loaded: function() {
      return (model().id && model().id());
    },
    create: function(title, callback) {
      model().title(title);
      model().save(function() {
        App.Router.push('route', model().id(), 'edit');
      });
    },
    loadMarkers: function(callback) {
      new App.Models.Marker().findAll(model().id(), function() {
        markers(this.markers());
        callback();
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

      markers($.map(markers(), function(m) {
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