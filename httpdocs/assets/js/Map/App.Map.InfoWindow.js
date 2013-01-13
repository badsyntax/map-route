App.Map.InfoWindow = (function() {
  
  var elem = $('<div />');

  var templates = {
    view: $('#map-infowindow-view-template').html(),
    edit: $('#map-infowindow-edit-template').html()
  };

  return function(type) {
    return new google.maps.InfoWindow({
      content: $('<div />').html(templates[type]).children().get(0),
      size: new google.maps.Size(50, 50),
      enableEventPropagation: false
    });
  };
}());