MapRoute.Map.Actions.Action = function() {
  this.handlers = [];
  this.map = MapRoute.Map.instance();
  this.active = ko.observable(false);
};

MapRoute.Map.Actions.Action.prototype = {
  bindEvents: function() {},
  execute: function() {
    this.bindEvents();
    this.active(true);
  },
  reset: function() {
    this.active(false);
    this.handlers = $.map(this.handlers, function(handler) {
      handler.remove();
      return null;
    });
    MapRoute.Map.Route.resetMarkers();
  }
};