App.Map.InfoWindow = (function() {

  return function(type) {

    var selector = '#map-infowindow-' + (type || 'view') + '-template';
    var template = $(selector).html();

    return new google.maps.InfoWindow({
      content: $(template)[0],
      size: new google.maps.Size(50, 50),
      enableEventPropagation: false
    });
  };

}());