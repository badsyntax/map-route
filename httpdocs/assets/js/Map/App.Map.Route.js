App.Map.Route = (function() {

  var markers = [];
  var routeModel;

  var route = {
    model: function() {
      return routeModel;
    },
    loadModel: function(callback) {

      new App.Models.Route().findAll(function(data) {
    
        routeModel = new App.Models.Route(data.routes[0]);

        // Create a new route for the user
        if (!routeModel.id || !routeModel.id()) {
          routeModel.title = 'Default route';
          return routeModel.save(callback);
        }

        callback();
      });
    },
    addMarkers: function() {
      App.Map.addMarkers(markers.markers());
    },
    loadMarkers: function() {
      this.loadModel(function() {
        markers = new App.Models.Marker();
        markers.findAll(this.model().id());
      }.bind(this));
    },
    updatePoint: function(marker) {
      console.log(marker);
      $.each(path, function(i, point) {
        console.log(marker);
        var pos = marker.getPosition();
        if (point.lat === pos.lat() && point.lng === pos.lng()) {
        }
      });
    },
    updatePath: function(p) {
      path = p;
      // model.values({
      //   path: path
      // });
    }
  };

  // route.loadModel();

  return route;
}());