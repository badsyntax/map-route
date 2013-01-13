App.ViewModels.Sidebar = function(container, controller) {
  this.container = container;
  this.controller = controller;
  this.setupObservables();
};

App.ViewModels.Sidebar.prototype.setupObservables = function() {
  this.markers = App.Map.Route.markers;
  this.route = App.Map.Route.points;
};

App.ViewModels.Sidebar.prototype.fadeIn = function(elem) {
  if (elem.nodeType === 1) {
    $(elem).hide().fadeIn(120);
  }
};

App.ViewModels.Sidebar.prototype.fadeOut = function(elem) {
  if (elem.nodeType === 1) {
    $(elem).fadeOut(120, function() {
      $(elem).remove();
    });
  }
};

App.ViewModels.Sidebar.prototype.rendered = function() {
  this.ui = new App.UI.Sidebar(this.container, this);
};

App.ViewModels.Sidebar.prototype.onRoutePointClick = function(marker, e) {
  
  e.preventDefault();

  App.Events.delegate(e, {
    '.edit': this.onEditButtonClick.bind(this),
    '.remove': this.onRemoveButtonClick.bind(this),
    'a': this.onAnchorClick.bind(this),
  });
};

App.ViewModels.Sidebar.prototype.onEditButtonClick = function(e, elem) {
  ko.dataFor(elem).edit();
};

App.ViewModels.Sidebar.prototype.onRemoveButtonClick = function(e, elem) {
  ko.dataFor(elem).remove();
};

App.ViewModels.Sidebar.prototype.onAnchorClick = function(e, elem) {
  ko.dataFor(elem).focus();
};

App.ViewModels.Sidebar.prototype.addPins = function() {
  App.Map.Actions.reset();
  App.Map.Actions.execute('Markers');
};