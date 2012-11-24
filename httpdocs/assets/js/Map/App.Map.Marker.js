App.Map.Marker = function(data) {

  var map = App.Map.instance();

  // Create the infowindow
  var infoWindow = new google.maps.InfoWindow({
    content: data.infoWindowContent[0],
    size: new google.maps.Size(50, 50),
    enableEventPropagation: false
  });

  // Create the marker
  var marker = new google.maps.Marker({
      infoWindow: infoWindow,
      position: data.location,
      map: map,
      draggable: true,
      clickable: true,
      animation: google.maps.Animation.DROP // google.maps.Animation.DROP | BOUNCE
  });
  App.Map.markers.push(marker);

  // Create the model
  marker.model = new App.Models.Pin({
    user_id: App.Config.get('user_id'),
    latitude: 0,
    longitute: 0
  })

  marker.model.save();
  
  return marker;
};