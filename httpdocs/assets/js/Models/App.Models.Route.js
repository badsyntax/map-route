/**
 * id, title
 */

App.Models.Route = function() {
  App.Models.Base.apply(this, arguments);
};

App.inherits(App.Models.Route, App.Models.Base);

App.Models.Route.prototype.create = function(success, error) {
  this._create(App.API.Route, success, error);
};

App.Models.Route.prototype.update = function(success, error) {
  this._update(App.API.Route, success, error);
};

App.Models.Route.prototype.remove = function(success, error) {
  this._remove(App.API.Route, success, error);
};

App.Models.Route.prototype.findAll = function(success, error) {
  App.API.Route.findAll({
    success: success,
    error: error,
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