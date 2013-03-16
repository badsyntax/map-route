MapRoute.ViewModels.Navbar = function(container, controller) {

  this.container = container;
  this.controller = controller;

  this.toolbar = new MapRoute.ViewModels.Navbar.Toolbar(this);
  this.dropmenuUser = new MapRoute.ViewModels.Navbar.DropMenu.User(this);
  this.dropmenuRoutes = new MapRoute.ViewModels.Navbar.DropMenu.Routes(this);
};

MapRoute.ViewModels.Navbar.prototype.rendered = function() {
  this.toolbar.rendered();
};