/* Map controller
 *************************/
App.Controllers.Map = function() {

  this.canvas = $('#map-canvas');

  window.mapCallback = this.init.bind(this);

  var attr = {
    type: 'text/javascript',
    src: [
      'http://maps.googleapis.com/maps/api/js?key=' + App.Config.get('mapApiKey'),
      'sensor=false',
      'callback=mapCallback'
    ].join('&')
  };

  $('<script />', attr).appendTo('body');
};

App.Controllers.Map.prototype.init = function() {

  var options = {
    zoom: 8,
    center: new google.maps.LatLng(-34.397, 150.644),
    mapTypeId: google.maps.MapTypeId.ROADMAP // ROADMAP SATELLITE HYBRID TERRAIN
  };

  this.map = new google.maps.Map(this.canvas[0], options);
  this.setMarkers();
  this.bindEvents();
};

App.Controllers.Map.prototype.setMarkers = function() {
  this.marker = new google.maps.Marker({
    position: this.map.getCenter(),
    map: this.map,
    title: 'Click to zoom'
  });
};

App.Controllers.Map.prototype.bindEvents = function() {
  google.maps.event.addListenerOnce(this.map, 'tilesloaded', this.onTilesLoaded.bind(this));
};

App.Controllers.Map.prototype.onTilesLoaded = function() {
  new App.Controllers.Toolbar();
};