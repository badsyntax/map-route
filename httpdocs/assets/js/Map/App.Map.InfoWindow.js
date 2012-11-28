App.Map.InfoWindow = (function(template) {

  return function(data) {

    return new google.maps.InfoWindow({
      content: $(template)[0],
      size: new google.maps.Size(50, 50),
      enableEventPropagation: false
    });
  };

}($('#map-infowindow-template').html()));