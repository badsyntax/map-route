/**
 * MapRoute
 * Author: Richard Willis (willis.rh@gmail.com)
 */

(function(exports) {

  var MapRoute = {};

  /* Namespaces */
  MapRoute.Controllers = {};
  MapRoute.Models = {};
  MapRoute.ViewModels = {},
  MapRoute.UI = {},
  MapRoute.Config = {},
  MapRoute.API = {}

  /* App init */
  MapRoute.init = function(config) {

    /* Set config */
    MapRoute.Config.set(config);

    /* Set globalization culture */
    Globalize.culture(config.culture || 'en-GB');

    /* Route to controllers */
    new MapRoute.Router();
  };

  exports.MapRoute = MapRoute;

}(this));