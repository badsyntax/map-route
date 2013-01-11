App.Models.Marker = function() {
  App.Models.Base.apply(this, arguments);
  this.api = App.API.Marker;
};

App.inherits(App.Models.Marker, App.Models.Base);

App.Models.Marker.prototype.findAll = function(success, error) {
  App.API.Marker.findAll({
    data: this.where(),
    success: success.bind(this),
    error: error,
    mapResponse: {
      model: this,
      mappingOptions: {
        'markers': {
          create: function(options) {
            return new App.Models.Marker(options.data);
          }
        }
      }
    }
  });
};