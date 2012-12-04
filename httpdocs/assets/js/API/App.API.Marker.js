App.API.Marker = (function(api) {

  var _super = App.API.Base;

  api.findAll = function(config) {
    return _super.prototype.findAll.apply(this, arguments);
  };

  return api;

}(new App.API.Base({
  url: '/api/markers'
})));