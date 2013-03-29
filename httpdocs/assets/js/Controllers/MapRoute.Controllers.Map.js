/* Map controller
 *************************/
MapRoute.Controllers.Map = function(route_id) {

  this.route_id = route_id;
  this.action   = MapRoute.Config.get('action'); // edit || view
  this.Map      = MapRoute.Map;

  this.init();
};

MapRoute.Controllers.Map.prototype = {
  init: function(map) {
    $.when(
      this.Map.load(),
      this.loadTemplates()
    )
    .then(this.Map.create.bind(this.Map))
    .then(this.initUI.bind(this));
  },
  initUI: function() {

    this.initModal();
    if (this.action === 'edit') {
      this.initNavbar();
      this.initSidebar();
    }

    $('#map-loader').remove();

    if (this.route_id === 'load') {
      MapRoute.Router.push('route', this.Map.Route.model().id(), 'edit');
    }

    this.Map.Route.show();
    this.bindEvents();
  },
  loadTemplates: function() {

    var deferred = $.Deferred();

    MapRoute.API.Views.find()
    .then(function(data) {
      $('body').append(data);
      this.initContainer();
      deferred.resolve();
    }.bind(this));

    return deferred.promise();
  },
  initContainer: function() {
    var container = $('#container-template');
    $('body').prepend(container.html());
  },
  initModal: function() {
    var container = $('#modal');
    var viewModel = new MapRoute.ViewModels.Modal(container, this);
    ko.applyBindings(viewModel, container[0]);
    MapRoute.UI.Modal.setup(container, viewModel);
  },
  initNavbar: function() {
    var container = $('#navbar');
    var viewModel = new MapRoute.ViewModels.Navbar(container, this);
    ko.applyBindings(viewModel, container[0]);
    viewModel.rendered();
  },
  initSidebar: function() {
    var container = $('#sidebar');
    var viewModel = new MapRoute.ViewModels.Sidebar(container, this);
    ko.applyBindings(viewModel, container[0]);
    viewModel.rendered();
  },
  bindEvents: function() {
    if (MapRoute.Config.get('map.loaded')) {
      return this.onTilesLoaded();
    }
    google.maps.event.addListenerOnce(this.Map.instance(), 'tilesloaded', this.onTilesLoaded.bind(this));
  },
  onTilesLoaded: function() {
    setTimeout(function() {
      if (this.action !== 'edit') {
        new this.Map.Actions.View().execute();
      }
    }.bind(this), 200);
  }
};