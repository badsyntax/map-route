App.Map.Marker = function(data) {

  var marker = this.createMarker(data);

  return $.extend(marker, {
    remove: function() {
      App.Map.removeMarker(marker);      
    }.bind(this)
  });
};

App.Map.Marker.prototype.createMarker = function(data) {
  var map = App.Map.instance();
  var infoWindow = new App.Map.InfoWindow();
  var marker = new google.maps.Marker({
      infoWindow: infoWindow,
      position: data.location,
      map: map,
      draggable: false,
      clickable: false,
      animation: google.maps.Animation.DROP // google.maps.Animation.DROP | BOUNCE
  });
  App.Map.markers.push(marker);
  this.createModel(marker, data);
  ko.applyBindings(marker.model, marker.infoWindow.getContent());
  return marker;
};

App.Map.Marker.prototype.createModel = function(marker, data) {
  
  marker.model = data.model;

  if (marker.model) {
    return;
  }

  marker.model = new App.Models.Marker();

  marker.model.values({
    user_id: App.Config.get('user_id'),
    latitude: data.location.lat(),
    longitude: data.location.lng(),
    title: '',
    description: ''
  });

  marker.model.save(data.success, data.error);
};