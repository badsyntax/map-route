/* Map controller
 *************************/
App.Controllers.Map = function(route_id, action) {
  
  this.route_id = route_id;
  this.action = action;
  this.initModal();

  App.Map.create(function(map){
    App.Map.Route.init(route_id, function() {
      if (App.Map.Route.loaded()) {
        this.init(map); 
      }
    }.bind(this));
  }.bind(this));
};

App.Controllers.Map.prototype.init = function(map) {
  if (this.route_id === 'load') {
    App.Router.push('route', App.Map.Route.model().id(), 'edit');
  }

  this.map = map;
  this.setConfig();
  this.bindEvents();
};

App.Controllers.Map.prototype.initModal = function() {
  var container = $('#modal');
  var viewModel = new App.ViewModels.Modal(container, this);
  ko.applyBindings(viewModel, container[0]);
  App.UI.Modal.setup(container, viewModel);
};

App.Controllers.Map.prototype.initToolbar = function() {
  var container = $('#toolbar');
  var viewModel = new App.ViewModels.Toolbar(container, this);
  ko.applyBindings(viewModel, container[0]);
  viewModel.rendered();
};

App.Controllers.Map.prototype.initSidebar = function() {
  var container = $('#sidebar');
  var viewModel = new App.ViewModels.Sidebar(container, this);
  ko.applyBindings(viewModel, container[0]);
  viewModel.rendered();
};

App.Controllers.Map.prototype.setConfig = function() {
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
};

App.Controllers.Map.prototype.bindEvents = function() {
  if (App.Config.get('map.loaded')) {
    return this.onTilesLoaded();
  }
  google.maps.event.addListenerOnce(this.map, 'tilesloaded', this.onTilesLoaded.bind(this));
};

App.Controllers.Map.prototype.onTilesLoaded = function() {

  App.Map.Route.addMarkers();
  App.Map.Route.fitMarkerBounds();

  setTimeout(function() {
    
    App.Map.Route.addRoute();
    
    if (this.action === 'edit') {
      this.initToolbar();
      this.initSidebar();
    } else {
      new App.Map.Actions.View().execute();
    }
  }.bind(this), 500);
};