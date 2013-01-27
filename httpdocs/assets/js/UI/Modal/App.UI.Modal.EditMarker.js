App.UI.Modal.EditMarker = (function(base) {

  var selector = '#modal-edit-marker';
  var model;

  function onShown() {

    var field = $(this).find('#inputSearchLocation');

    (new App.UI.PlacesSearch(field))
    .on('onAddressSelect', function(e, result, status) {
      var location = result.geometry.location;
      model.latitude(location.lat());
      model.longitude(location.lng());
    });
  }
  
  function show(dataModel, actionCallback) {
    model = dataModel;
    
    base.show(selector, {
      heading: 'Edit location',
      buttons: [{
        title: 'Save',
        action: actionCallback,
        type: 'btn-primary'
      }, {
        title: 'Cancel',
        action: '',
        type: ''
      }]
    }, dataModel, onShown);
  }

  return Object.inherits(base, {
    show: show
  });

}(App.UI.Modal)) 