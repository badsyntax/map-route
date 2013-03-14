App.UI.Modal.EditMarker = (function(base) {

  var shown;
  var container;

  var photos = {
    init: function() {
      alert('view photos');
    }
  }

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
      
      var tab = e.target.href.replace(/^[^#]*#/, '');
      tabs.initUI(tab);

      $.data(this, 'tab-ui-init', true);
    },
    initUI: function(tab) {
      switch(tab) {
        case 'photos-view':
          photos.init();
        break;
        case 'photos-upload':
          upload.init();
        break;
        case 'location': 
          placesSearch.init();
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
  
  function show(selector, model, callback) {
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
    base.show(selector, config, model, onModalShown);
  }

  return $.extend({}, base, {
    show: show
  });
}(App.UI.Modal));
