/* Toolbar viewmodel
 *************************/

App.ViewModels.Toolbar = function(controller) {
  this.controller = controller;
  this.setObservables();
};

App.ViewModels.Toolbar.prototype.setObservables = function() {
  
  var buttons = [
    new App.Models.ToolbarButton({
      caption: 'Default',
      className: 'default active',
      action: new App.Toolbar.Actions.Default()
    }),
    new App.Models.ToolbarButton({
      caption: 'Add pin',
      className: 'add-pin',
      action: new App.Toolbar.Actions.AddPin()
    }),
    new App.Models.ToolbarButton({
      caption: 'Add Route',
      className: 'add-route',
      action: new App.Toolbar.Actions.AddRoute()
    })
  ];

  this.buttons = ko.observableArray(buttons);
};