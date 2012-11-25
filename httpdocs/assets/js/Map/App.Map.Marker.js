App.Map.Marker = function(data) {

  var map = App.Map.instance();

  var infoWindow = new App.Map.InfoWindow();

  // Create the marker
  var marker = new google.maps.Marker({
      infoWindow: infoWindow,
      position: data.location,
      map: map,
      draggable: false,
      clickable: false,
      animation: google.maps.Animation.DROP // google.maps.Animation.DROP | BOUNCE
  });
  App.Map.markers.push(marker);

  // Create the marker model
  marker.model = data.model;
  if (!marker.model) {
    marker.model = new App.Models.Marker();
    marker.model.values({
      user_id: App.Config.get('user_id'),
      latitude: data.location.lat(),
      longitude: data.location.lng()
    });
    marker.model.save(data.success, data.error);
  }
  
  return marker;
};