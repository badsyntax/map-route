App.Map.InfoWindow = (function(templates) {
  
  var elem = $('<div />');

  return function(type) {
    if (!templates) {
      templates = {
        view: $('#map-infowindow-view-template').html(),
        edit: $('#map-infowindow-edit-template').html()
      };
    }
    return new google.maps.InfoWindow({
      content: $('<div />').html(templates[type]).children().get(0),
      size: new google.maps.Size(50, 50),
      enableEventPropagation: false
    });
  };
}());