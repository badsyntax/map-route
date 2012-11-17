// app.js

if (!Function.prototype.bind) {
  Function.prototype.bind = function(scope) {
    return $.proxy(this, scope);
  };
}

var App = {};

/* Config
 *************************/
App.Config = (function() {

  var data = {};

  var Config = {
    get: function (key) {
      if (key === undefined) {
        return data;
      }
      var parts = key.split('.');
      var obj = data;
      for(var i = 0, l = parts.length; i < l; i++) {
        obj = obj[ parts[i] ];
      }
      return obj;
    },
    set: function (key, val) {
      
      if (typeof key === 'object' && val === undefined) {
        $.extend(data, key);
      } else {
        var obj = data;
        var parts = key.split('.');
        key = parts.pop();

        for(var i = 0, l = parts.length; i < l; i++) {
          if (obj[ parts[i] ] === undefined) {
            obj[ parts[i] ] = {};
          }
          obj = obj[ parts[i] ];
        }

        if (typeof obj[key] === 'object' && typeof val === 'object') {
          $.extend(obj[key], val);
        } else {
          obj[key] = val;
        }
      }
    },
    remove: function(key) {
      if (key !== undefined) {
        delete data[key];
      } else {
        data = {};
      }
    }
  };
  return Config;
})();

/* Map
 *************************/
App.Map = (function() {

  var element = $('#map-canvas');

  return {
    init: function() {      
  
      var options = {
        zoom: 8,
        center: new google.maps.LatLng(-34.397, 150.644),
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };

      this.map = new google.maps.Map(element[0], options);
    },
    load: function() {
      
      var attr = {
        type: 'text/javascript',
        src: 'http://maps.googleapis.com/maps/api/js?key=' + App.Config.get('mapApiKey') + '&sensor=false&callback=App.Map.init'
      };

      $('<script />', attr).appendTo('body');
    }
  };
})();


/* Init
 *************************/
App.init = function() {
  App.Map.load();
};

$(App.init.bind(App));