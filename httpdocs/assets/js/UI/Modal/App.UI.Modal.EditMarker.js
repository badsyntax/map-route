App.UI.Modal.EditMarker = (function(base) {

  var selector = '#modal-edit-marker';
  var model;

  function onShown() {

    var container = $(this);
    var field = container.find('#inputSearchLocation');

    (new App.UI.PlacesSearch(field))
      .on('onAddressSelect', function(e, result, status) {
        var location = result.geometry.location;
        model.latitude(location.lat());
        model.longitude(location.lng());
      });

    container.find('.nav-tabs a').on('click', function(e) {
      e.preventDefault();
      $(this).tab('show');
    });
  }
  
  function show(dataModel, actionCallback) {
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