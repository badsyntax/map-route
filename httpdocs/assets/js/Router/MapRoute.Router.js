MapRoute.Router = function() {
  this.setPaths({
    '#/route(/:route_id)(/:action)': this.initMapController,
    '#/signin': this.initSignInController.bind(this)
  });
};

MapRoute.Router.inherit({}, {
  initMapController: function() {
    MapRoute.Config.set('action', this.params['action'] || 'view');
    new MapRoute.Controllers.Map(
      this.params['route_id'] || 0
    );
  },
  initSignInController: function() {

    var defaultRoute = MapRoute.Config.get('default_route');

    if (!MapRoute.Config.get('user_id')) {
      new MapRoute.Controllers.SignIn();
    } else if (defaultRoute) {
      MapRoute.Router.push('route', defaultRoute, 'edit');
    } else {
      MapRoute.Router.push('route', 'new');
    }
  },
  rescue: function() {
    MapRoute.Router.push('signin');
  },
  setPaths: function(paths) {

    for(var path in paths) {
      if (paths.hasOwnProperty(path)) {
        Path.map(path).to(paths[path]);
      }
    }

    Path.rescue(this.rescue.bind(this));

    if (window.location.pathname === '/') {
      Path.root('#/signin');
    }

    Path.listen(true);
  }
});

MapRoute.Router.push = function() {
  var segments = $.makeArray(arguments);
  window.location.hash = "#/" + segments.join('/');
};