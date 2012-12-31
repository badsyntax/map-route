App.ViewModels.Navbar = function(container, controller) {
  this.container = container;
  this.controller = controller;
  this.initViewModels();
};

App.ViewModels.Navbar.prototype.rendered = function() {
  // this.ui = new App.UI.Toolbar(this.container, this);
};

App.ViewModels.Navbar.prototype.initViewModels = function() {
  this.toolbar = new App.ViewModels.Navbar.Toolbar($('#toolbar'), this);
  this.dropmenu = new App.ViewModels.Navbar.DropMenu($('#dropmenu'), this);
};
