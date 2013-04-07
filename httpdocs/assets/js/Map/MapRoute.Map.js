MapRoute.Map = (function() {

  var map = ko.observable();

  return {
    instance: map,
    create: function(route_id) {

      var options = {
        center: new google.maps.LatLng(10.089036, 10.992188),
        mapTypeId: google.maps.MapTypeId.ROADMAP // ROADMAP | SATELLITE | HYBRID | TERRAIN
      };

      map(new google.maps.Map($('#map-canvas')[0], options));

      this.bindEvents();

      return this.Route.init(route_id);
    },
    load: function() {

      var deferred = $.Deferred();

      window.mapCallback = function() {
        this.setConfig();
        deferred.resolve();
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

      return deferred.promise();
    },
    setConfig: function() {
      MapRoute.Config.set('polyOptions', {
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
    },
    bindEvents: function() {
      google.maps.event.addListenerOnce(map(), 'tilesloaded', function() {
        MapRoute.Config.set('map.loaded', true);
      }.bind(this));
    }
  };
}());