/* Map controller
 *************************/
App.Controllers.Map = function() {
  App.Map.create(this.init.bind(this));
};

App.Controllers.Map.prototype.init = function(map) {
  this.map = map;
  this.bindEvents();
};

App.Controllers.Map.prototype.bindEvents = function() {
  google.maps.event.addListenerOnce(this.map, 'tilesloaded', this.onTilesLoaded.bind(this));
};

App.Controllers.Map.prototype.onTilesLoaded = function() {
  new App.Controllers.Toolbar();
  new App.Controllers.Modal();
};