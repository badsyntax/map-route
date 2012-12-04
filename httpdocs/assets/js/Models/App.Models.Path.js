/**
 * id, route_id
 */

App.Models.Path = function() {
  App.Models.Base.apply(this, arguments);
};

App.inherits(App.Models.Path, App.Models.Base);

App.Models.Path.prototype.create = function(success, error) {
  this._create(App.API.Path, success, error);
};

App.Models.Path.prototype.update = function(success, error) {
  this._update(App.API.Path, success, error);
};

App.Models.Path.prototype.remove = function(success, error) {
  this._remove(App.API.Path, success, error);
};