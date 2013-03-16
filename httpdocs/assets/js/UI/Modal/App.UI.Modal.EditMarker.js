App.UI.Modal.EditMarker = (function(base) {

  var container;
  var viewModel;

  /* View uploaded photos UI */
  var photos = {
    init: function(tab, tabId) {
      this.tab = tab;
      this.container = $('#' + tabId);
      viewModel.loadPhotos();
      if (!this.boundEvents) {
        this.bindEvents();
      }
    },
    bindEvents: function() {
      this.boundEvents = true;
      this.container.on('click', 'a.thumbnail', this.onThumbClick.bind(this));
    },
    onThumbClick: function(e) {

      e.preventDefault();
      var model = ko.dataFor(e.target);

      switch($(e.target).data('action')) {
        // Remove photo
        case 'remove':
          e.target.className = 'icon-spinner icon-spin';
          viewModel.removePhoto(model, viewModel.loadPhotos.bind(viewModel));
        break;
        // Download photo`
        case 'download':
          this.downloadPhoto(model);
        break;
        // View photo
        default:
          viewModel.viewPhoto(model);
        break;
      }
    },
    downloadPhoto: function(model) {
      window.open(model.origPath());
    }
  };

  /* Upload Photos UI */
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
      this.uploadedContainer.html('');
      this.fileupload = this.uploadCcontainer.fileupload({
        autoUpload: true,
        dataType: 'json',
        acceptFileTypes: /(\.|\/)(png|jpe?g)$/i,
        type: 'POST',
        url: '/api/photos',
        // maxFileSize:
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

  /* Places search UI */
  var placesSearch = {
    init: function() {
      var search = new App.UI.PlacesSearch(container.find('#inputSearchLocation'));
      search.on('onAddressSelect', function(e, result, status) {});
    }
  };

  /* Tabs UI */
  var tabs = {
    init: function() {
      container.find('.nav-tabs a').on('click', this.select);
    },
    select: function(e) {

      e.preventDefault();
      $(this).tab('show');

      if ($.data(this, 'tab-ui-init')) {
        return;
      }

      if (!tabs.initUI(this)) {
        $.data(this, 'tab-ui-init', true);
      }
    },
    initUI: function(tabAnchor) {
      var tabId = tabAnchor.href.replace(/^[^#]*#/, '')
      switch(tabId) {
        case 'photos-view':
          photos.init(tabAnchor, tabId);
          return true;
        break;
        case 'photos-upload':
          upload.init(tabAnchor, tabId);
          return false;
        break;
        case 'location':
          placesSearch.init(tabAnchor, tabId);
          return false;
        break;
      }
    }
  };

  function onModalShown(e) {
    // The 'shown' event bubbles up from the tabs :(
    if ($(e.target).data('modal')) {
      container = $(this);
      tabs.init();
    }
  }

  function show(selector, dataModel, callback) {

    viewModel = dataModel;

    var config = {
      heading: 'Edit location',
      buttons: [{
        title: 'Save',
        action: callback,
        type: 'btn-primary'
      }, {
        title: 'Cancel',
        action: '',
        type: ''
      }]
    };
    base.show(selector, config, dataModel, onModalShown);
  }

  return $.extend({}, base, {
    show: show
  });
}(App.UI.Modal));
