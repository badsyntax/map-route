App.ViewModels.Sidebar = function(container, controller) {
  this.container = container;
  this.controller = controller;
  this.setupObservables();
};

App.ViewModels.Sidebar.prototype.setupObservables = function() {
  this.markers = App.Map.Route.markers;
  
  this.route = ko.computed(function() {
    return $.map(App.Map.Route.points(), function(marker) {
      
      var model = marker.model;
      
      if (!model.route_title) {
        model.route_title = ko.observable();
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
  marker.focus();
};
