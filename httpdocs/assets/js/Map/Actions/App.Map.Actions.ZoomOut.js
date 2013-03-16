MapRoute.Map.Actions.ZoomOut = function() {
  MapRoute.Map.Actions.Action.apply(this, arguments);
};

MapRoute.Map.Actions.ZoomOut.inherit(MapRoute.Map.Actions.Action, {
  execute: function() {
    MapRoute.Map.Actions.Action.prototype.execute.apply(this, arguments);
    MapRoute.Map.Route.fitMarkerBounds();
    this.reset();
  }
});
