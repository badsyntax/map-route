App.Map.Marker = function(data) {

  var map = App.Map.instance();
  var marker = this.createMarker(map, data);

  ko.applyBindings(marker.model, marker.infoWindow.getContent());

  return $.extend(marker, {
    focus: function() {
      App.Map.Route.resetMarkers();
      marker.infoWindow.open(map, marker);
    },
    remove: function() {
      App.Map.Route.removeMarker(marker, true, true);      
    }.bind(this)
  });
};

App.Map.Marker.prototype.createMarker = function(map, data) {

  var type = App.Config.get('action'); // view|edit
  var infoWindow = new App.Map.InfoWindow(type);
  
  var marker = new google.maps.Marker({
      infoWindow: infoWindow,
      position: data.location,
      map: map,
      draggable: false,
      clickable: false,
      animation: google.maps.Animation.DROP // google.maps.Animation.DROP | BOUNCE
  });
  App.Map.Route.markers().push(marker);

  marker.model = this.createModel(marker, data);

  return marker;
};

App.Map.Marker.prototype.createModel = function(marker, data) {
  
  if (data.model) {
    return data.model;
  }

  var model = new App.Models.Marker();

  model.values({
    user_id: App.Config.get('user_id'),
    latitude: data.location.lat(),
    longitude: data.location.lng(),
    title: '',
    description: '',
    route_id: App.Map.Route.model().id,
    route_order: -1
  });

  model.save(data.success, data.error);

  return model;
};