App.Models.Marker = function() {
  App.Models.Base.apply(this, arguments);
};

App.inherits(App.Models.Marker, App.Models.Base);

App.Models.Marker.prototype.create = function(success, error) {
  App.API.Marker.create({
    data: ko.mapping.toJSON(this),
    success: success,
    error: error,
    mapResponse: {
      fields: [ 'id' ],
      model: this
    }
  });
};

App.Models.Marker.prototype.update = function(success, error) {
  App.API.Marker.update({
    data: ko.mapping.toJSON(this),
    success: success,
    error: error
  });
};

App.Models.Marker.prototype.remove = function(success, error) {
  App.API.Marker.remove({
    data: ko.mapping.toJSON(this),
    success: success,
    error: error
  });
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