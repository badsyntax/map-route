App.Map.Route = (function() {

  var path = [];
  var model = new App.Models.Route();

  var route = {
    updatePoint: function(marker) {
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

  return route;
}());