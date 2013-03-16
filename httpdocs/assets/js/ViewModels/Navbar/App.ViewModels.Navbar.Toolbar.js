MapRoute.ViewModels.Navbar.Toolbar = function(controller) {

  this.controller = controller;
  this.curAction = null;
  this.buttons = ko.observableArray();

  this.setData();

  // Set KO binding handler context
  this.onButtonClick = this.onButtonClick.bind(this);
};

MapRoute.ViewModels.Navbar.Toolbar.prototype = {
  rendered: function() {
    this.container = $('#toolbar');
    this.container.find('[rel="tooltip"]').tooltip();
  },
  setData: function() {
    this.buttons([
      new MapRoute.Models.ToolbarButton({
        caption: 'Add Pins',
        className: 'toolbar-add-pin',
        iconClassName: 'icon-map-marker',
        action: MapRoute.Map.Actions.factory('Markers')
      }),
      new MapRoute.Models.ToolbarButton({
        caption: 'Plan Route',
        className: 'add-route',
        iconClassName: 'icon-sitemap',
        action: MapRoute.Map.Actions.factory('Routes')
      }),
      new MapRoute.Models.ToolbarButton({
        caption: 'Zoom Out',
        className: 'toolbar-zoom',
        iconClassName: 'icon-zoom-out',
        action: MapRoute.Map.Actions.factory('ZoomOut')
      }),
      new MapRoute.Models.ToolbarButton({
        caption: 'Share',
        className: 'toolbar-share',
        iconClassName: 'icon-share',
        action: MapRoute.Map.Actions.factory('Share')
      })
    ]);
  },
  executeAction: function(e, model) {
    if (this.curAction) {
      this.curAction.reset();
    }
    (this.curAction = model.action).execute();
  },
  onButtonClick: function(model, e) {
    this.executeAction(e, model);
  }
};