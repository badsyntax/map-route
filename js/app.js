// app.js
var App = {};

/* Shims
 *************************/
if (!Function.prototype.bind) {
  Function.prototype.bind = function(scope) {
    return $.proxy(this, scope);
  };
}

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
}());

App.log = function() {
  if (App.Config.get('debug') === true && console && console.log) {
    console.log.apply(console, arguments);
  }
};

/* UI
 *************************/
App.UI = {};

App.UI.Toolbar = function(container, viewModel) {
  this.container = container;
  this.viewModel = viewModel;
  this.bindEvents();
};

App.UI.Toolbar.prototype.bindEvents = function() {
  this.container.on('click', '.add-pin', this.onAddPinClick.bind(this));
  this.container.on('click', '.add-route', this.onAddRouteClick.bind(this));
};

App.UI.Toolbar.prototype.onAddPinClick = function(e) {
  alert('Add pin!');
};

App.UI.Toolbar.prototype.onAddRouteClick = function(e) {
  alert('Add route!');
};

/* ViewModels
 *************************/
App.ViewModels = {};

App.ViewModels.Toolbar = function() {
  this.data = {};
};

/* Controllers
 *************************/
App.Controllers = {};

App.Controllers.Toolbar = function() {
  this.container = $('#toolbar');
  this.initViewModel();
  this.initUI();
};

App.Controllers.Toolbar.prototype.initViewModel = function() {
  this.viewModel = new App.ViewModels.Toolbar();
  ko.applyBindings(this.viewModel, this.container[0]);
};

App.Controllers.Toolbar.prototype.initUI = function() {
  this.ui = new App.UI.Toolbar(this.container, this.viewModel);
};

/* Map singleton controller
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

/* Init
 *************************/
App.init = function() {
  
  App.log('Loaded in ' + ((new Date()).getTime() - window.__start) + 'ms');
  
  new App.Controllers.Map();
};

$(App.init.bind(App));
