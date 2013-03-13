App.Map.Actions.View = function() {
  App.Map.Actions.Action.apply(this, arguments);
};

App.Map.Actions.View.inherit(App.Map.Actions.Action, {
  execute: function() {
    App.Map.Actions.Action.prototype.execute.apply(this, arguments);
  },
  bindEvents: function() {
    $.each(App.Map.Route.markers(), this.bindMarkerEvents.bind(this));
  },
  bindMarkerEvents: function(i, marker) {

    marker.setCursor('pointer');
    marker.setDraggable(true);

    this.handlers.push(google.maps.event.addListener(marker, 'click', function(e) {
      this.toggleInfoWindow(e, marker);
    }.bind(this)));

    this.bindInfoWindowEvents(marker);
  },
  bindInfoWindowEvents: function(marker) {

    var content = $(marker.infoWindow.getContent());

    // content.on('click.pin', 'a.remove-pin', function(e) {
    //   this.onRemoveMarkerClick.call(this, e, marker);
    // }.bind(this));
  },
  toggleInfoWindow: function(e, marker) {
    if (!marker.infoWindow.getMap()) {
      marker.infoWindow.open(this.map, marker);
    } else {
      marker.infoWindow.close();
    }
  }
});  