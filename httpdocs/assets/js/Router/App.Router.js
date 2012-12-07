App.Router = function() {

  Path.map("#/route(/:route_id)(/:action)").to(function(){
    new App.Controllers.Map(
      this.params['route_id'] || 0, 
      this.params['action'] || 'edit'
    );
  });

  Path.map('#/signin').to(function() {
    new App.Controllers.SignIn();
  })

  Path.map('#/').to(function() {
    if (!App.Config.get('user_id')) {
      App.Router.push('signin');
    } else {
      App.Router.push('route', 'load');
    }
  });

  Path.root('#/');
  Path.listen();
};

App.Router.push = function() {
  var segments = $.makeArray(arguments);
  window.location.hash = '/' + segments.join('/');
};