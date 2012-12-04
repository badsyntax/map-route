/* Map controller
 *************************/
App.Controllers.Map = function() {

  new App.Controllers.Modal();
  new App.Controllers.Modal.Login();
  new App.Controllers.Modal.EditMarkerDescription();
  
  if (!App.Config.get('user_id')) {
    return this.showLoginModal();
  }

  App.Map.create(this.init.bind(this));
};

App.Controllers.Map.prototype.init = function(map) {
  this.map = map;
  App.Map.Route.loadMarkers();
  this.bindEvents();
};

App.Controllers.Map.prototype.showLoginModal = function() {
  
  $('#map-canvas').empty();

  setTimeout(function() {
    App.UI.Modal.Login.show();
    App.Map.create();
  }, 150);
};

App.Controllers.Map.prototype.bindEvents = function() {
  google.maps.event.addListenerOnce(this.map, 'tilesloaded', this.onTilesLoaded.bind(this));
};

App.Controllers.Map.prototype.onTilesLoaded = function() {

  new App.Controllers.Toolbar();

  App.Map.Route.addMarkers();
};