App.Models.Route = function() {
  App.Models.Base.apply(this, arguments);
  this.api = App.API.Route;
};

App.Models.Route.inherit(App.Models.Base, {
  findAll: function(success, error) {
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
  }
});
