MapRoute.API.Marker = (function(api) {

  var _super = MapRoute.API.Base;

  api.findAll = function(config) {
    return _super.prototype.findAll.apply(this, arguments);
  };

  return api;

}(new MapRoute.API.Base({
  url: '/api/markers'
})));