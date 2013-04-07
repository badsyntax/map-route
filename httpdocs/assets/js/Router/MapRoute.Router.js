define([
  'underscore',
  'Config',
  'Controllers/Controllers.Map',
  'Path',
], function(_, Config, MapController) {

  var Router = function() {
    this.setPaths({
      '#/route(/:route_id)(/:action)': this.initMapController,
      '#/signin': this.initSignInController.bind(this)
    });
  };

  Router.prototype = {
    constructor: Router,
    initMapController: function() {
      Config.set('action', this.params['action'] || 'view');
      new MapController(
        this.params['route_id'] || 0
      );
    },
    initSignInController: function() {

      var defaultRoute =  Config.get('default_route');

      if (! Config.get('user_id')) {
        new MapRoute.Controllers.SignIn();
      } else if (defaultRoute) {
        Router.push('route', defaultRoute, 'edit');
      } else {
        Router.push('route', 'new');
      }
    },
    rescue: function() {
      Router.push('signin');
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
  };

  Router.push = function() {
    var segments = $.makeArray(arguments);
    window.location.hash = "#/" + segments.join('/');
  };

  return Router;
});