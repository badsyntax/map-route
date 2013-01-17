App.Map.Actions.ZoomOut = function() {
  App.Map.Actions.Action.apply(this, arguments);
};

App.inherits(App.Map.Actions.ZoomOut, App.Map.Actions.Action);

App.Map.Actions.ZoomOut.prototype.execute = function() {
  App.Map.Actions.Action.prototype.execute.apply(this, arguments);
  App.Map.Route.fitMarkerBounds()
  this.reset();
};