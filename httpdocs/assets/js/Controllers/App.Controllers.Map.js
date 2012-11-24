/* Map controller
 *************************/
App.Controllers.Map = function() {
  App.Map.create(this.init.bind(this));
};

App.Controllers.Map.prototype.init = function(map) {
  
  new App.Controllers.Modal();
  new App.Controllers.Modal.Login();
  
  if (!App.Config.get('user_id')) {
    return App.UI.Modal.Login.show();
  }
  
  new App.Controllers.Toolbar();

  this.map = map;
  this.bindEvents();
};

App.Controllers.Map.prototype.bindEvents = function() {
  google.maps.event.addListenerOnce(this.map, 'tilesloaded', this.onTilesLoaded.bind(this));
};

App.Controllers.Map.prototype.onTilesLoaded = function() {
  // Load and add the markers
  var markers = new App.Models.Marker();
  markers.findAll(function() {
    var action = new App.Map.Actions.AddMarker();
    action.addMarkers(markers.markers());
    action.reset();
  });
};