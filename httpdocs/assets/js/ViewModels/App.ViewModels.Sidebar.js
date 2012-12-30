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
      
      var defaultTitle = model.title() || 
        model.description() || 
        (model.longitude().toFixed(5)+', '+model.latitude().toFixed(5));
      
      var route_title = (parseInt(model.route_order(), 10) + 1) + '. ' + defaultTitle;

      model.route_title(route_title);
      
      return marker;
    });
  }, this);
};

App.ViewModels.Sidebar.prototype.rendered = function() {
  this.ui = new App.UI.Sidebar(this.container, this);
};
