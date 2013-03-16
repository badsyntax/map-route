MapRoute.Models.Route = function() {
  MapRoute.Models.Base.apply(this, arguments);
  this.api = MapRoute.API.Route;
};

MapRoute.Models.Route.inherit(MapRoute.Models.Base, {
  findAll: function(success, error) {
    MapRoute.API.Route.findAll({
      success: success,
      error: error,
      data: this.where(),
      mapResponse: {
        model: this,
        mappingOptions: {
          'routes': {
            create: function(options) {
                return new MapRoute.Models.Route(options.data);
            }
          }
        }
      }
    });
  }
});
