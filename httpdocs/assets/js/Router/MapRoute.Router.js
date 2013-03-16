MapRoute.Router = function() {
  this.setPaths();
  Path.listen(true);
};

MapRoute.Router.prototype.setPaths = function() {

  var defaultRoute = MapRoute.Config.get('default_route');

  Path.map("#/route(/:route_id)(/:action)").to(function(){
    new MapRoute.Controllers.Map(
      this.params['route_id'] || 0,
      this.params['action'] || 'view'
    );
  });

  Path.map('#/signin').to(function() {
    if (!MapRoute.Config.get('user_id')) {
      new MapRoute.Controllers.SignIn();
    } else if (defaultRoute) {
      MapRoute.Router.push('route', defaultRoute, 'edit');
    } else {
      MapRoute.Router.push('route', 'new');
    }
  });

  Path.rescue(function() {
    MapRoute.Router.push('signin');
    // throw new Error('Not found');
  });

  if (window.location.pathname === '/') {
    Path.root('#/signin');
  }
};

MapRoute.Router.push = function() {
  var segments = $.makeArray(arguments);
  window.location.hash = "#/" + segments.join('/');
};