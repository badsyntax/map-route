requirejs.config({
  baseUrl: '/assets/js',
  paths: {
    'Config': 'Config/MapRoute.Config',
    'Globalize': '../lib/jquery/globalize',
    'Router': 'Router/MapRoute.Router',
    'Path': '../lib/jquery/path.min',
    'underscore': '../lib/underscore/underscore-1.4.4.min',
    'jquery': '../lib/jquery/jquery-1.9.1.min',
  },
  shim: {
    'Globalize': {
      exports: 'Globalize'
    },
    'Path': {
      exports: 'Path'
    }
  }
});

require([
  './MapRoute'
], function (MapRoute) {
  MapRoute.init();
});