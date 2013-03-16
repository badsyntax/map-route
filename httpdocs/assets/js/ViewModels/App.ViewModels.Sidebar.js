App.ViewModels.Sidebar = function(container, controller) {
  this.container = container;
  this.controller = controller;
  this.setupObservables();
};

App.ViewModels.Sidebar.prototype = {
  setupObservables: function() {
    this.markers = App.Map.Route.markers;
    this.route = App.Map.Route.points;
    this.routeModel = App.Map.Route.model;
    this.ajaxSuccessMessage = ko.observable(false);
  },
  rendered: function() {
    this.ui = new App.UI.Sidebar(this.container.find('.search'), this);
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

    App.Events.delegate(e, {
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
    App.Map.Actions.reset();
    App.Map.Actions.execute('Markers');
  }
};