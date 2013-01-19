App.Map.Actions.ZoomOut = function() {
  App.Map.Actions.Action.apply(this, arguments);
};

App.Map.Actions.ZoomOut.prototype = Object.inherits(App.Map.Actions.Action, {
  execute: function() {
    App.Map.Actions.Action.prototype.execute.apply(this, arguments);
    App.Map.Route.fitMarkerBounds();
    this.reset();
  }
});
