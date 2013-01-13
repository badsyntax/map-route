App.Map.Marker = (function() {

  var handlers = [];
  var curMarker;

  function onMarkerDragEnd(e, marker) {

    marker.model.values({
      longitude: marker.getPosition().lng(),
      latitude: marker.getPosition().lat()
    }).save();

    App.Map.Route.updatePoint(marker);
  };

  function toggleInfoWindow(e, marker) {
    if (!marker.infoWindow.getMap()) {
      App.Map.Route.resetMarkers();
      marker.infoWindow.open(App.Map.instance(), marker);
    } else {
      marker.infoWindow.close();
    }
  };

  function onRemoveMarkerClick(e, marker) {
    e.preventDefault();
    marker.remove();
  };

  function onAddDescriptionMarkerClick(e, marker) {
    
    if (e && e.preventDefault) {
      e.preventDefault()
    }

    curMarker = marker;

    App.UI.Modal.show('#modal-edit-marker', {
      heading: 'Edit marker',
      buttons: [{
        title: 'Save',
        action: saveDescription,
        type: 'btn-primary'
      }, {
        title: 'Cancel',
        action: '',
        type: ''
      }]
    }, marker.model);
  };

  function saveDescription(e) {
    if (e && e.preventDefault) {
      e.preventDefault();
    }

    curMarker.model.save();
    App.UI.Modal.hide();

    // Refresh the infowindow dimensions
    var infoWindow = curMarker.infoWindow;
    infoWindow.setContent(infoWindow.getContent());
  };

  function createModel(marker, data) {

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
      route_id: App.Map.Route.model().id,
      route_order: -1
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

    marker.model = createModel(marker, data);

    bindEvents(marker);

    ko.applyBindings(marker.model, marker.infoWindow.getContent());

    return marker;
  }

  return {
    factory: function(data) {

      var map = App.Map.instance();
      var marker = createMarker(map, data);

      return $.extend(marker, {
        focus: function() { 
          App.Map.Route.resetMarkers();
          marker.infoWindow.open(map, marker);
          marker.model.isActive(true);
        },
        edit: function() {
          onAddDescriptionMarkerClick(null, marker);
        },
        remove: function() {
          App.Map.Route.removeMarker(marker, true, true);      
        }.bind(this)
      });
    }
  };
})();
