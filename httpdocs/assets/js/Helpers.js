/* Inheritance helper */
Function.prototype.inherit = function(_super, _sub) {

  this.prototype = $.extend({}, _super.prototype || _super);
  this.prototype.constructor = this;

  // Mixin new properties and methods
  $.extend(this.prototype, _sub);

  return this;
};