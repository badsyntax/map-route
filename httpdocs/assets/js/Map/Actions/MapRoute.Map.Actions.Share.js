MapRoute.Map.Actions.Share = function() {
  MapRoute.Map.Actions.Action.apply(this, arguments);
};

MapRoute.Map.Actions.Share.inherit(MapRoute.Map.Actions.Action, {
  execute: function() {
    MapRoute.UI.Modal.show('#modal-share', {
      heading: 'Share'
    }, {
      url: 'http://maproute.proxima.cc/#/route/' + MapRoute.Map.Route.model().id()
    });
  },
  reset: function() {
    MapRoute.Map.Actions.Action.prototype.reset.apply(this, arguments);
  }
});