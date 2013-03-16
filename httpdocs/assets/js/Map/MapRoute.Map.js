MapRoute.Map = (function(canvas) {

  var map = ko.observable();

  return {
    instance: map,
    create: function(callback) {
      if (!map()) {
        this.load(callback);
      } else {
        callback(map());
      }
    },
    load: function(callback) {

      window.mapCallback = function() {
        this.init();
        if (callback) {
          this.bindEvents();
          callback(map());
        }
      }.bind(this);

      var attr = {
        type: 'text/javascript',
        src: 'http://maps.googleapis.com/maps/api/js?' + [
          'key=' + MapRoute.Config.get('mapApiKey'),
          'sensor=false',
          'callback=mapCallback',
          'libraries=places'
        ].join('&')
      };

      $('<script />', attr).appendTo('body');
    },
    init: function() {

      var options = {
        center: new google.maps.LatLng(10.089036, 10.992188),
        mapTypeId: google.maps.MapTypeId.ROADMAP // ROADMAP | SATELLITE | HYBRID | TERRAIN
      };

      map(new google.maps.Map(canvas[0], options));
    },
    bindEvents: function() {
      google.maps.event.addListenerOnce(map(), 'tilesloaded', function() {
        MapRoute.Config.set('map.loaded', true);
      }.bind(this));
    }
  };

}($('#map-canvas')));