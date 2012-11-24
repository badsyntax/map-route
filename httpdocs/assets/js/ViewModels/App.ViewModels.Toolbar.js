/* Toolbar viewmodel
 *************************/

App.ViewModels.Toolbar = function(controller) {
  this.controller = controller;
  this.setObservables();
};

App.ViewModels.Toolbar.prototype.setObservables = function() {
  
  var buttons = [
    new App.Models.ToolbarButton({
      caption: 'Pins',
      className: 'add-pin',
      iconClassName: 'icon-map-marker',
      action: new App.Map.Actions.AddMarker()
    }),
    new App.Models.ToolbarButton({
      caption: 'Routes',
      className: 'add-route',
      iconClassName: 'icon-sitemap',
      action: new App.Map.Actions.AddRoute()
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
  ];

  this.buttons = ko.observableArray(buttons);
};