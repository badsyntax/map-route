App.Map.Actions.Action = function() {
  this.handlers = [];
  this.map = App.Map.instance();
};

App.Map.Actions.Action.prototype.bindEvents = function() {};

App.Map.Actions.Action.prototype.execute = function() {
  this.bindEvents();
};

App.Map.Actions.Action.prototype.reset = function() {
  this.handlers = $.map(this.handlers, function(handler) {
    handler.remove();
    return null;
  });
  App.Map.Route.resetMarkers();
};