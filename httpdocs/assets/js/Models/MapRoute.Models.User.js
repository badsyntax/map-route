MapRoute.Models.User = function(data) {
  MapRoute.Models.Base.apply(this, arguments);
  this.api = MapRoute.API.User;
};

MapRoute.Models.User.inherit(MapRoute.Models.Base);