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
        if (callback) {
          callback(map);
        }
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
        mapTypeId: google.maps.MapTypeId.ROADMAP // ROADMAP | SATELLITE | HYBRID | TERRAIN
      };

      map = new google.maps.Map(canvas[0], options);
    },
    instance: function() {
      return map;
    },
    addMarkers: function(markers) {
      $.each(markers, function(i, marker) {
        setTimeout(function() {

          new App.Map.Marker({
            model: marker,
            location: new google.maps.LatLng(marker.latitude(), marker.longitude())
          });
        
        }.bind(this), i * 160);
      }.bind(this));
    },
    removeMarker: function(marker) {

      marker.model.remove();
      marker.infoWindow.close();
      marker.setMap(null);

      this.markers = $.map(this.markers, function(m) {
        return m === marker ? null : m;
      });
    }
  };
}());