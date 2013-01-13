App.ViewModels.Sidebar = function(container, controller) {
  this.container = container;
  this.controller = controller;
  this.setupObservables();
};

App.ViewModels.Sidebar.prototype.setupObservables = function() {
  this.markers = App.Map.Route.markers;

  setTimeout(function() {
    console.log(this.markers()[0])
  }.bind(this), 2500);
  
  this.route = ko.computed(function() {
    return $.map(App.Map.Route.points(), function(marker) {
      
      var model = marker.model;
      
      if (!model.route_title) {
        model.route_title = ko.observable();
      }
      if (!model.isActive) {
        model.isActive = ko.observable(false);
      }
      
      var title = model.title() || 
        model.description() || 
        (model.longitude().toFixed(5)+', '+model.latitude().toFixed(5));

      var route_title = (parseInt(model.route_order(), 10) + 1) + '. ' + title;

      model.route_title(route_title);
      
      return marker;
    });
  }, this);
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
    'a': this.onAnchorClick.bind(this)
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