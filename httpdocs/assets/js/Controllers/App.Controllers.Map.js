/* Map controller
 *************************/
App.Controllers.Map = function() {
  
  if (!App.Config.get('user_id')) {
    return this.showLoginModal();
  }

  App.Map.create(this.init.bind(this));
};

App.Controllers.Map.prototype.init = function(map) {
  this.map = map;
  this.setConfig();
  this.bindEvents();
  App.Map.Route.init();
};

App.Controllers.Map.prototype.setConfig = function() {
  App.Config.set('polyOptions', {
    strokeColor: '#000000',
    strokeOpacity: 1.0,
    strokeWeight: 3,
    map: this.map,
    editable: false,
    icons: [{
      icon: {
        path: google.maps.SymbolPath.FORWARD_OPEN_ARROW
      },
      offset: '100%'
    }]
  });
};

App.Controllers.Map.prototype.showLoginModal = function() {
  setTimeout(function() {
    App.UI.Modal.show('#modal-login', {
      heading: 'Sign in',
      controls: false
    });
    App.Map.create();
  }, 150);
};

App.Controllers.Map.prototype.bindEvents = function() {
  google.maps.event.addListenerOnce(this.map, 'tilesloaded', this.onTilesLoaded.bind(this));
};

App.Controllers.Map.prototype.onTilesLoaded = function() {

  new App.Controllers.Toolbar();

  App.Map.Route.addMarkers();

  setTimeout(function() {
    App.Map.Route.addPath();
  }, 600);
};