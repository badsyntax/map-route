App.Map = (function() {
  
  var map;
  var canvas = $('#map-canvas');

  return {
    create: function(callback) {
      if (!map) {
        this.load(callback);
      }
    },
    load: function(callback) {

      window.mapCallback = function() {
        this.init();
        callback(map);
      }.bind(this);

      var attr = {
        type: 'text/javascript',
        src: [
          'http://maps.googleapis.com/maps/api/js?key=' + App.Config.get('mapApiKey'),
          'sensor=false',
          'callback=mapCallback'
        ].join('&')
      };

      $('<script />', attr).appendTo('body');
    },
    init: function() {

      var options = {
        zoom: 8,
        center: new google.maps.LatLng(-34.397, 150.644),
        mapTypeId: google.maps.MapTypeId.ROADMAP // ROADMAP SATELLITE HYBRID TERRAIN
      };

      map = new google.maps.Map(canvas[0], options);
    },
    instance: function() {
      return map;
    }
  };
}());