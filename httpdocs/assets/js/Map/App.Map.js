App.Map = (function() {
  
  var map;
  var canvas = $('#map-canvas');

  return {
    Actions: {},
    markers: [],
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
        zoom: 6,
        center: new google.maps.LatLng(-30.679559110919985, 24.411089843750005),
        mapTypeId: google.maps.MapTypeId.ROADMAP // ROADMAP SATELLITE HYBRID TERRAIN
      };

      map = new google.maps.Map(canvas[0], options);
    },
    instance: function() {
      return map;
    }
  };
}());