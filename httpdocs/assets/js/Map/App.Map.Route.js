App.Map.Route = (function() {

  var path = [];
  var routeModel;

  var route = {
    model: function() {
      return routeModel;
    },
    loadModel: function() {

      new App.Models.Route().findAll(function(data) {
    
        routeModel = new App.Models.Route(data.routes[0]);

        if (!routeModel.id || !routeModel.id()) {
          routeModel.title = 'Default route';
          routeModel.save();
        }
      });
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

  route.loadModel();

  return route;
}());