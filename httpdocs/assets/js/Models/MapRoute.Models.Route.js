MapRoute.Models.Route = function() {
  MapRoute.Models.Base.apply(this, arguments);
  this.api = MapRoute.API.Route;
};

MapRoute.Models.Route.inherit(MapRoute.Models.Base, {});
