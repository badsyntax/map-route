/**
 * Maproute
 * Author: Richard Willis (willis.rh@gmail.com)
 */

/* Inheritance helper */
Function.prototype.inherit = function(_super, _sub) {

  this.prototype = $.extend({}, _super.prototype || _super);
  this.prototype.constructor = this;

  // Mixin new properties and methods
  $.extend(this.prototype, _sub);

  return this;
};

var MapRoute = {};

/* MapRoute bootstrap */
MapRoute.bootstrap = function(config) {

  /* Set config */
  MapRoute.Config.set(config);

  /* Set globalization culture */
  Globalize.culture(config.culture || 'en-GB');

  /* Route to controllers */
  new MapRoute.Router();
};

/* MapRoute namespaces */
MapRoute.Controllers = {};
MapRoute.Models = {};
MapRoute.ViewModels = {},
MapRoute.UI = {},
MapRoute.Config = {},
MapRoute.API = {}