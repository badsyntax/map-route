App.Map.Marker = function(data) {

  var marker = this.createMarker(data);
  marker.model = this.createModel(marker, data);

  ko.applyBindings(marker.model, marker.infoWindow.getContent());

  return $.extend(marker, {
    remove: function() {
      App.Map.Route.removeMarker(marker, true);      
    }.bind(this)
  });
};

App.Map.Marker.prototype.createMarker = function(data) {

  var map = App.Map.instance();
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
    route_id: App.Map.Route.model().id
  });

  model.save(data.success, data.error);

  return model;
};