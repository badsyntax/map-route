App.Router = function() {
  this.setPaths();
  Path.listen(true);
};

App.Router.prototype.setPaths = function() {
  
  var defaultRoute = App.Config.get('default_route');

  Path.map("#/route(/:route_id)(/:action)").to(function(){
    new App.Controllers.Map(
      this.params['route_id'] || 0, 
      this.params['action'] || 'view'
    );
  });

  Path.map('#/signin').to(function() {
    if (!App.Config.get('user_id')) {
      new App.Controllers.SignIn();
    } else if (defaultRoute) {
      App.Router.push('route', defaultRoute, 'edit');
    } else {
      App.Router.push('route', 'new');
    }
  });

  Path.rescue(function() {
    App.Router.push('signin');
    // throw new Error('Not found');
  });

  if (window.location.pathname === '/') {
    Path.root('#/signin');
  }
};

App.Router.push = function() {
  var segments = $.makeArray(arguments);
  window.location.hash = "#/" + segments.join('/');
};