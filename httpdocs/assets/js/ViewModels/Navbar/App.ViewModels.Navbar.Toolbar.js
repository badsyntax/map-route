App.ViewModels.Navbar.Toolbar = function(controller) {
  
  this.controller = controller;
  this.curAction = null;
  this.buttons = ko.observableArray();

  this.setData();

  // Set KO binding handler context
  this.onButtonClick = this.onButtonClick.bind(this);
};

App.ViewModels.Navbar.Toolbar.prototype.rendered = function() {
  this.container = $('#toolbar');
  this.container.find('[rel="tooltip"]').tooltip();
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

App.ViewModels.Navbar.Toolbar.prototype.onButtonClick = function(model, e) {
  this.executeAction(e, model);
};