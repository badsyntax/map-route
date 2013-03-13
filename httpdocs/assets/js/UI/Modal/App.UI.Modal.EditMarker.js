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

    var container = $('#fileupload');

    console.log(container.length);

    container.fileupload({
            // Uncomment the following to send cross-domain cookies:
            //xhrFields: {withCredentials: true},
            autoUpload: true,
            dataType: 'json',
            multipart: true,
            acceptFileTypes: /(\.|\/)(png|jpe?g)$/i,
            type: 'POST',     
            previewMaxWidth: 78,
            previewMaxHeight: 53,
            url: '/api/photos'
        });

    container.on('fileuploadcompleted', onFileUploadCompleted);

    function onFileUploadCompleted(e, data) {
      var completedFileRows = data.filesContainer.find('.template-download').not('.error');
      completedFileRows.remove();
    }

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

  return $.extend({}, base, {
    show: show
  });

}(App.UI.Modal));
