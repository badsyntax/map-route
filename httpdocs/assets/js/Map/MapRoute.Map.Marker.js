MapRoute.Map.Marker = (function() {

  var handlers = [];

  function onMarkerDragEnd(e, marker) {

    marker.model.values({
      longitude: marker.getPosition().lng(),
      latitude: marker.getPosition().lat()
    }).save();

    MapRoute.Map.Route.updatePoint(marker);
  }

  function toggleInfoWindow(e, marker) {
    if (!marker.infoWindow.getMap()) {
      MapRoute.Map.Route.resetMarkers();
      marker.infoWindow.open(MapRoute.Map.instance(), marker);
    } else {
      marker.infoWindow.close();
    }
  }

  function onRemoveMarkerClick(e, marker) {
    e.preventDefault();
    marker.remove();
  }

  function onAddDescriptionMarkerClick(e, marker) {

    if (e && e.preventDefault) {
      e.preventDefault();
    }

    var viewModel = new MapRoute.ViewModels.Modal.EditMarker(marker.model);

    MapRoute.UI.Modal.EditMarker.show('#modal-edit-marker', viewModel, function onSave(e) {

      if (e && e.preventDefault) {
        e.preventDefault();
      }

      viewModel.save();
      MapRoute.Map.Route.refresh();

      // Refresh the infowindow dimensions
      var infoWindow = marker.infoWindow;
      infoWindow.setContent(infoWindow.getContent());
    });
  }

  function createModel(marker, data) {

    if (data.model) {
      return data.model;
    }

    var model = new MapRoute.Models.Marker({
      user_id: MapRoute.Config.get('user_id'),
      latitude: data.location.lat(),
      longitude: data.location.lng(),
      route_id: MapRoute.Map.Route.model().id
    });

    model.save(data.success, data.error);

    return model;
  }

  function bindInfoWindowEvents(marker) {

    var content = $(marker.infoWindow.getContent());

    content.on('click.pin', 'a.remove-pin', function(e) {
      onRemoveMarkerClick.call(this, e, marker);
    }.bind(this));

    content.on('click.pin', 'a.add-description', function(e) {
      onAddDescriptionMarkerClick.call(this, e, marker);
    }.bind(this));
  }

  function bindEvents(marker) {

    marker.setCursor('pointer');
    marker.setDraggable(true);

    handlers.push(google.maps.event.addListener(marker, 'click', function(e) {
      toggleInfoWindow(e, marker);
    }.bind(this)));

    handlers.push(google.maps.event.addListener(marker, 'dragend', function(e) {
      onMarkerDragEnd(e, marker);
    }.bind(this)));

    bindInfoWindowEvents(marker);
  }

  function createMarker(map, data) {

    var type = MapRoute.Config.get('action'); // view|edit
    var infoWindow = new MapRoute.Map.InfoWindow(type);

    var marker = new google.maps.Marker({
      infoWindow: infoWindow,
      position: data.location,
      map: map,
      draggable: false,
      clickable: false,
      animation: google.maps.Animation.DROP // google.maps.Animation.DROP | BOUNCE
    });

    marker.model = createModel(marker, data);
    bindEvents(marker);

    MapRoute.Map.Route.markers.push(marker);

    ko.applyBindings(marker.model, marker.infoWindow.getContent());

    return marker;
  }

  return {
    factory: function(data) {

      var map = MapRoute.Map.instance();
      var marker = createMarker(map, data);

      return $.extend(marker, {
        reset: function() {
          this.setAnimation(null);
          this.infoWindow.close();
          this.setCursor('pointer');
          this.setDraggable(true);
          this.updatePosition();
        },
        updatePosition: function() {
          var latlng = new google.maps.LatLng(
            marker.model.latitude(),
            marker.model.longitude()
          );
          marker.setPosition(latlng);
        },
        focus: function() {
          MapRoute.Map.Route.resetMarkers();
          marker.infoWindow.open(map, marker);
          marker.model.active(true);
        },
        edit: function() {
          onAddDescriptionMarkerClick(null, marker);
        },
        remove: function() {
          MapRoute.Map.Route.removeMarker(marker, true, true);
        }.bind(this)
      });
    }
  };
}());
