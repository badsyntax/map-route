MapRoute.Router = function() {

  // Redirect to default route
  if (window.location.pathname === '/') {
    Path.root('#/');
  }

  this.setPaths({
    // Default route
    '#/': function home() {
      new MapRoute.Controllers.Home();
    },
    // Logged in map route
    '#/route(/:route_id)(/:action)': function map() {
      new MapRoute.Controllers.Map(
        this.params['route_id'] || 0,
        this.params['action'] || 'view'
      );
    },
  });
};

MapRoute.Router.inherit({}, {
  setPaths: function(paths) {
    // Set the routes
    for(var path in paths) {
      if (paths.hasOwnProperty(path)) {
        Path.map(path).to(paths[path]);
      }
    }
    Path.rescue(function rescue() {
      MapRoute.Router.push('');
    });
    Path.listen(true);
  }
});

MapRoute.Router.push = function() {
  var segments = $.makeArray(arguments);
  window.location = '#/' + segments.join('/');
};