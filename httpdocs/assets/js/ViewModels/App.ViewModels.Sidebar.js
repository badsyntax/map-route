App.ViewModels.Sidebar = function(container, controller) {
  this.container = container;
  this.controller = controller;
};

App.ViewModels.Sidebar.prototype.values = function(data) {
  ko.mapping.fromJS(data, null, this);
};

App.ViewModels.Sidebar.prototype.rendered = function() {
  this.ui = new App.UI.Sidebar(this.container, this);
};
