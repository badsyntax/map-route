App.Map.InfoWindow = (function() {
  
  var templates = {
    view: $('#map-infowindow-view-template').html(),
    edit: $('#map-infowindow-edit-template').html()
  };

  return function(type) {
    return new google.maps.InfoWindow({
      content: $(templates[type])[0],
      size: new google.maps.Size(50, 50),
      enableEventPropagation: false
    });
  };
}());