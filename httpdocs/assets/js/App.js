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

/* App bootstrap */
function App(config) {

  /* Set config */
  App.Config.set(config);

  /* Set globalization culture */
  Globalize.culture('en-GB');

  /* Route to controllers */
  new App.Router();
}

/* App namespaces */
App.Controllers = {};
App.Models = {};
App.ViewModels = {},
App.UI = {},
App.Config = {},
App.API = {}