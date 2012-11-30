/**
 * id, title
 */

App.Models.Route = function() {
  App.Models.Base.apply(this, arguments);
  this.api = App.API.Route;
};

App.inherits(App.Models.Route, App.Models.Base);

App.Models.Route.prototype.create = function(success, error) {
  this._create(this.api, success, error);
};

App.Models.Route.prototype.update = function(success, error) {
  this._update(this.api, success, error);
};

App.Models.Route.prototype.remove = function(success, error) {
  this._remove(this.api, success, error);
};