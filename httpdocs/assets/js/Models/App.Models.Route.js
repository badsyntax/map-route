App.Models.Route = function() {
  App.Models.Base.apply(this, arguments);
  this.api = App.API.Route;
};

App.inherits(App.Models.Route, App.Models.Base);

App.Models.Route.prototype.findAll = function(success, error) {
  App.API.Route.findAll({
    success: success,
    error: error,
    data: this.where(),
    mapResponse: {
      model: this,
      mappingOptions: {
        'routes': {
          create: function(options) {
              return new App.Models.Route(options.data);
          }
        }
      }
    }
  });
};