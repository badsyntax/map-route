MapRoute.ViewModels.Navbar = function(container, controller) {

  this.container = container;
  this.controller = controller;

  this.toolbar = new MapRoute.ViewModels.Navbar.Toolbar(this);
  this.dropmenu = new MapRoute.ViewModels.Navbar.DropMenu(this);
};

MapRoute.ViewModels.Navbar.prototype.rendered = function() {
  this.toolbar.rendered();
  this.dropmenu.rendered();
};