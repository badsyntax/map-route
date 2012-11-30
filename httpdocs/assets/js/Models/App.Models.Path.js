/**
 * id, route_id
 */

App.Models.Path = function() {
  App.Models.Base.apply(this, arguments);
  this.api = App.API.Path;
};

App.inherits(App.Models.Path, App.Models.Base);

App.Models.Path.prototype.create = function(success, error) {
  this._create(this.api, success, error);
};

App.Models.Path.prototype.update = function(success, error) {
  this._update(this.api, success, error);
};

App.Models.Path.prototype.remove = function(success, error) {
  this._remove(this.api, success, error);
};