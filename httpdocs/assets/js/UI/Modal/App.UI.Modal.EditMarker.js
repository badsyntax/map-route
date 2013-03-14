App.UI.Modal.EditMarker = (function(base) {

  var shown;
  var container;

  var upload = {
    init: function () {
      this.uploaded = 0;
      this.getElements();
      this.initPlugin();
    },
    getElements: function() {
      this.uploadCcontainer = $('#fileupload');
      this.progressContainer = container.find('.fileupload-progress');
      this.uploadedContainer = container.find('.fileupload-uploaded');
    },
    initPlugin: function() {
      this.fileupload = this.uploadCcontainer.fileupload({
        autoUpload: true,
        dataType: 'json',
        acceptFileTypes: /(\.|\/)(png|jpe?g)$/i,
        type: 'POST',     
        url: '/api/photos',
        progressall: this.onProgressAll.bind(this),
        start: this.onStart.bind(this),
        stop: this.onStop.bind(this)
      })
      .on('fileuploaddone', this.onDone.bind(this))
      .data('blueimp-fileupload');
    },
    updateUploadedMessage: function() {
      var msg = [
        this.uploaded,
        (this.uploaded === 1) ? 'file' : 'files',
        'uploaded'
      ].join(' ');
      this.uploadedContainer.html(msg);
    },
    onProgressAll: function(e, data) {
      var progress = parseInt(data.loaded / data.total * 100, 10);
      this.progressContainer
        .find('.progress')
        .attr('aria-valuenow', progress)
        .find('.bar').css(
          'width',
          progress + '%'
        );
    },
    onStart: function (e) {
      this.fileupload._transition(this.progressContainer);
    },
    onStop: function (e) {
      this.fileupload._transition(this.progressContainer);
    },
    onDone: function (e, data) {
      this.uploaded++;
      this.updateUploadedMessage();
    }
  };  

  function initPlacesSearch() {
    var search = new App.UI.PlacesSearch(container.find('#inputSearchLocation'));
    search.on('onAddressSelect', function(e, result, status) {});
  }

  function initTabs() {
    container.find('.nav-tabs a').on('click', function(e) {
      e.preventDefault();
      $(this).tab('show');
    });
  }

  function onShown() {
    if (shown) {
      return;
    }
    shown = true;
    container = $(this);
    initPlacesSearch();
    initTabs();
    upload.init();
  }
  
  function show(dataModel, actionCallback) {
    shown = false;
    var config = {
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
    };
    base.show('#modal-edit-marker', config, dataModel, onShown);
  }

  return $.extend({}, base, {
    show: show
  });
}(App.UI.Modal));
