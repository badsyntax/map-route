/* Toolbar viewmodel
 *************************/

App.ViewModels.Toolbar = function(container) {
  this.container = container;
  this.buttons = ko.observableArray();
  this.curAction = null;
  this.setData();
};

App.ViewModels.Toolbar.prototype.rendered = function() {
  this.ui = new App.UI.Toolbar(this.container, this);
};

App.ViewModels.Toolbar.prototype.setData = function() {
  this.buttons([
    new App.Models.ToolbarButton({
      caption: 'Pins',
      className: 'add-pin',
      iconClassName: 'icon-map-marker',
      action: new App.Map.Actions.Markers()
    }),
    new App.Models.ToolbarButton({
      caption: 'Routes',
      className: 'add-route',
      iconClassName: 'icon-sitemap',
      action: new App.Map.Actions.Routes()
    }),
    new App.Models.ToolbarButton({
      caption: 'Share',
      className: 'share',
      iconClassName: 'icon-share',
      action: new App.Map.Actions.Share()
    }),
    new App.Models.ToolbarButton({
      caption: 'Sign out',
      className: 'sign-out',
      iconClassName: 'icon-signout',
      action: {
        execute: function() {
          window.location = '/auth/signout';
        }
      }
    })
  ]);
};

App.ViewModels.Toolbar.prototype.executeAction = function(e, model) {
  if (this.curAction) {
    this.curAction.reset();
  }
  (this.curAction = model.action).execute();
};