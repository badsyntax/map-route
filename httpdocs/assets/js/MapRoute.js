define([
  'Config',
  'Router',
  'Globalize'
], function (Config, Router, Globalize) {

  var MapRoute = {
    init: function() {

      /* Set config */
      Config.set(window.appConfig);

      /* Set globalization culture */
      Globalize.culture(Config.get('culture') || 'en-GB');

      /* Route to controllers */
      new Router();
    }
  };

  return MapRoute;
});