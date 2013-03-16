MapRoute.Map.Route = (function() {

  var markersData = ko.observableArray();
  var markers     = ko.observableArray();
  var points      = ko.observableArray();
  var path        = ko.observable();
  var model       = ko.observable();
  var poly        = ko.observable();

  var route = {

    markers: markers,
    poly:    poly,
    path:    path,
    model:   model,
    points:  points,

    init: function(route_id, callback) {
      this.reset();
      this.load(route_id, function() {
        this.loadMarkers(route_id, callback);
      }.bind(this));
    },
    reset: function() {
      this.removeMarkers();
      this.removeRoute();
    },
    refresh: function() {
      this.resetMarkers();
      this.removeRoute();
      this.addRoute();
      this.fitMarkerBounds();
    },
    show: function() {
      this.addMarkers();
      this.fitMarkerBounds();
      this.addRoute();
    },
    createPoly: function() {
      poly(new google.maps.Polyline(MapRoute.Config.get('polyOptions')));
      poly().setMap(MapRoute.Map.instance());
      path(poly().getPath());
    },
    load: function(route_id, callback) {

      new MapRoute.Models.Route().where('id', route_id).findAll(function(data) {

        model(new MapRoute.Models.Route(data.routes[0] || {
          id: 0,
          title: ''
        }));

        if (this.loaded()) {
          callback();
        } else if (route_id === 'new') {
          this.create('Default route');
        } else {
          throw new Error('Route not found');
          // MapRoute.Router.push('');
        }
      }.bind(this));
    },
    loaded: function() {
      return (model().id && model().id());
    },
    create: function(title, callback) {
      model().title(title);
      model().save(function() {
        MapRoute.Router.push('route', model().id(), 'edit');
      });
    },
    loadMarkers: function(route_id, callback) {
      new MapRoute.Models.Marker().where('route_id', route_id).findAll(function() {
        markersData(this.markers());
        if (callback) {
          callback();
        }
      });
    },
    addMarker: function(location) {
      var marker = MapRoute.Map.Marker.factory({
        location: location
      });
      MapRoute.GlobalEvents.trigger('addmarker');
    },
    addMarkers: function() {
      markers($.map(markersData(), function(marker) {
        return MapRoute.Map.Marker.factory({
          model: marker,
          location: new google.maps.LatLng(
            marker.latitude(),
            marker.longitude()
          )
        });
      }.bind(this)));
    },
    removeMarkers: function() {
      $.each(markers(), function(i, marker) {
        this.removeMarker(marker, false, false);
      }.bind(this));
      markers([]);
      markersData([]);
    },
    removeMarker: function(marker, removeModel, removeMarker) {

      if (removeModel) {
        marker.model.remove();
      }
      if (removeMarker) {
        markers.remove(marker);
      }
      if (marker.infoWindow) {
        marker.infoWindow.close();
      }

      marker.setMap(null);

      this.removePoint(marker, false);

      MapRoute.GlobalEvents.trigger('removemarker');
    },
    fitMarkerBounds: function() {
      var map = MapRoute.Map.instance();
      if (markers().length) {
        var bounds = new google.maps.LatLngBounds();
        $.each(markers(), function(i, marker) {
            bounds.extend(marker.getPosition());
        });
        map.fitBounds(bounds);
      }
      if (markers().length <= 1) {
        map.setZoom(2);
      }
    },
    resetMarkers: function() {
      $.each(markers(), function(i, marker) {

        marker.reset();

        if ($.isFunction(marker.model.active)) {
          marker.model.active(false);
        }
      });
    },
    removePoints: function() {
      $.each(points(), function(i, point) {
        path().removeAt(i);
      });
      points([]);
    },
    removePoint: function(marker, updateModel) {

      $.each(points(), function(i, point) {
        if (marker === point) {
          path().removeAt(i);
          points.splice(i, 1);
          return false;
        }
      });

      if (updateModel) {
        marker.model.values({
          route_order: -1
        }).save();
      }
    },
    addPoint: function(marker, routeOrder) {

      path().push(marker.getPosition());
      points.push(marker);

      marker.model.values({
        route_order: routeOrder
      }).save();

      MapRoute.GlobalEvents.trigger('addpoint');
    },
    updatePoint: function(marker) {
      $.each(points(), function(i, point) {
        if (marker === point) {
          var pos = marker.getPosition();
          path().setAt(i, pos);
          points()[i] = marker;
          return false;
        }
      });
    },
    addRoute: function() {

      if (!(poly() instanceof google.maps.Polyline)) {
        this.createPoly();
      }

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
    },
    removeRoute: function() {
      this.removePoints();
      this.removePath();
    },
    removePath: function() {
      path([]);
      poly(null);
    }
  };

  return route;
}());