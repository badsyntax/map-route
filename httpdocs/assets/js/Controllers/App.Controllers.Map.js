/* Map controller
 *************************/
App.Controllers.Map = function(route_id, action) {
  
  this.route_id = route_id;
  this.action = action;

  var self = this;
  
  this.initUI(function() {
    App.Map.create(function(map){
      App.Map.Route.init(route_id, function() {
        if (App.Map.Route.loaded()) {
          self.init(map); 
        }
      });
    });
  });
};

App.Controllers.Map.prototype = {
  initUI: function(callback) {
    this.loadTemplates(function() {
      this.initModal();
      callback();
    }.bind(this));
  },
  init: function(map) {
    if (this.route_id === 'load') {
      App.Router.push('route', App.Map.Route.model().id(), 'edit');
    }

    this.map = map;
    this.setConfig();

    App.Map.Route.show();

    if (this.action === 'edit') {
      this.initNavbar();
      this.initSidebar();
    }

    this.bindEvents();
  },
  loadTemplates: function(callback) {
    $.get('/templates', function(data) {
      $('body').append(data);
      callback();
    });
  },initModal: function() {
    var container = $('#modal');
    var viewModel = new App.ViewModels.Modal(container, this);
    ko.applyBindings(viewModel, container[0]);
    App.UI.Modal.setup(container, viewModel);
  },
  initNavbar: function() {
    var container = $('#navbar');
    var viewModel = new App.ViewModels.Navbar(container, this);
    ko.applyBindings(viewModel, container[0]);
    viewModel.rendered();
  },
  initSidebar: function() {
    var container = $('#sidebar');
    var viewModel = new App.ViewModels.Sidebar(container, this);
    ko.applyBindings(viewModel, container[0]);
    viewModel.rendered();
  },
  setConfig: function() {
    App.Config.set('action', this.action);
    App.Config.set('polyOptions', {
      strokeColor: '#000000',
      strokeOpacity: 1.0,
      strokeWeight: 3,
      map: this.map,
      editable: false,
      icons: [{
        icon: {
          path: google.maps.SymbolPath.FORWARD_OPEN_ARROW
        },
        offset: '100%'
      }]
    });
  },
  bindEvents: function() {
    if (App.Config.get('map.loaded')) {
      return this.onTilesLoaded();
    }
    google.maps.event.addListenerOnce(this.map, 'tilesloaded', this.onTilesLoaded.bind(this));
  },
  onTilesLoaded: function() {
    setTimeout(function() {
      if (this.action !== 'edit') {
        new App.Map.Actions.View().execute();
      }
    }.bind(this), 200);
  }
};