App.ViewModels.Navbar = function(container, controller) {
  
  this.container = container;
  this.controller = controller;

  this.toolbar = new App.ViewModels.Navbar.Toolbar(this);
  this.dropmenu = new App.ViewModels.Navbar.DropMenu(this);
};

App.ViewModels.Navbar.prototype.rendered = function() {
  this.toolbar.rendered();
  this.dropmenu.rendered();
};