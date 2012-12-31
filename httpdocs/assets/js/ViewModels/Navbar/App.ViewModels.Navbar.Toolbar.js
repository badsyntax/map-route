App.ViewModels.Navbar.Toolbar = function(container, controller) {
  this.container = container;
  this.controller = controller;
  this.buttons = ko.observableArray();
  this.curAction = null;
  this.setData();
};

App.ViewModels.Navbar.Toolbar.prototype.rendered = function() {
  this.ui = new App.UI.Toolbar(this.container, this);
};

App.ViewModels.Navbar.Toolbar.prototype.setData = function() {
  this.buttons([
    new App.Models.ToolbarButton({
      caption: 'Manage Pins',
      className: 'toolbar-add-pin',
      iconClassName: 'icon-map-marker',
      action: new App.Map.Actions.Markers()
    }),
    new App.Models.ToolbarButton({
      caption: 'Manage Routes',
      className: 'add-route',
      iconClassName: 'icon-sitemap',
      action: new App.Map.Actions.Routes()
    }),
    new App.Models.ToolbarButton({
      caption: 'Share',
      className: 'toolbar-share',
      iconClassName: 'icon-share',
      action: new App.Map.Actions.Share()
    })
  ]);
};

App.ViewModels.Navbar.Toolbar.prototype.executeAction = function(e, model) {
  if (this.curAction) {
    this.curAction.reset();
  }
  (this.curAction = model.action).execute();
};

App.ViewModels.Navbar.Toolbar.prototype.reset = function() {
  $.each(this.buttons(), function(i, button) {
    // console.log(button);;
  });
};