App.Models.Marker = function() {
  App.Models.Base.apply(this, arguments);
};

App.inherits(App.Models.Marker, App.Models.Base);

App.Models.Marker.prototype.create = function(success, error) {
  this._create(App.API.Marker, success, error);
};

App.Models.Marker.prototype.update = function(success, error) {
  this._update(App.API.Marker, success, error);
};

App.Models.Marker.prototype.remove = function(success, error) {
  this._remove(App.API.Marker, success, error);
};

App.Models.Marker.prototype.save = function() {
  App.Models.Base.prototype.save.apply(this, arguments);
};

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