App.Models.Marker = function() {
  App.Models.Base.apply(this, arguments);
  this.api = App.API.Marker;
};

App.inherits(App.Models.Marker, App.Models.Base);

App.Models.Marker.prototype.create = function(success, error) {
  this._create(this.api, success, error)
};

App.Models.Marker.prototype.update = function(success, error) {
  this._update(this.api, success, error);
};

App.Models.Marker.prototype.remove = function(success, error) {
  this._remove(this.api, success, error);
};

App.Models.Marker.prototype.findAll = function(success, error) {
  App.API.Marker.findAll({
    success: success,
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