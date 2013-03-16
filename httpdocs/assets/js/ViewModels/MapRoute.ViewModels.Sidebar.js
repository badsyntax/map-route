MapRoute.ViewModels.Sidebar = function(container, controller) {
  this.container = container;
  this.controller = controller;
  this.setupObservables();
};

MapRoute.ViewModels.Sidebar.prototype = {
  setupObservables: function() {
    this.markers = MapRoute.Map.Route.markers;
    this.route = MapRoute.Map.Route.points;
    this.routeModel = MapRoute.Map.Route.model;
    this.ajaxSuccessMessage = ko.observable(false);
  },
  rendered: function() {
    this.ui = new MapRoute.UI.Sidebar(this.container.find('.search'), this);
  },
  fadeIn: function(elem) {
    if (elem.nodeType === 1) {
      $(elem).hide().fadeIn(120);
    }
  },
  fadeOut: function(elem) {
    if (elem.nodeType === 1) {
      $(elem).fadeOut(120, function() {
        $(elem).remove();
      });
    }
  },
  onRoutePointClick: function(marker, e) {

    e.preventDefault();

    MapRoute.Events.delegate(e, {
      '.edit': this.onEditButtonClick.bind(this),
      '.remove': this.onRemoveButtonClick.bind(this),
      'a': this.onAnchorClick.bind(this)
    });
  },
  onEditButtonClick: function(e, elem) {
    ko.dataFor(elem).edit();
  },
  onRemoveButtonClick: function(e, elem) {
    ko.dataFor(elem).remove();
  },
  onAnchorClick: function(e, elem) {
    ko.dataFor(elem).focus();
  },
  addPins: function() {
    MapRoute.Map.Actions.reset();
    MapRoute.Map.Actions.execute('Markers');
  }
};