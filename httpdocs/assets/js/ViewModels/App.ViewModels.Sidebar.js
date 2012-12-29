App.ViewModels.Sidebar = function(container, controller) {
  this.container = container;
  this.controller = controller;

  this.route = ko.observableArray([
    {
      title: '1. Port St Johns'  
    }, 
    {
      title: '2. George'  
    }
  ]);

  this.markers = ko.observableArray([
    {
      title: 'Port St Johns'  
    }, 
    {
      title: '1212, 34332'  
    }
  ]);
};

App.ViewModels.Sidebar.prototype.values = function(data) {
  ko.mapping.fromJS(data, null, this);
};

App.ViewModels.Sidebar.prototype.rendered = function() {
  this.ui = new App.UI.Sidebar(this.container, this);
};
