/* Toolbar UI
 *************************/
App.UI.Toolbar = function(controller, container, viewModel) {
  this.controller = controller;
  this.container = container;
  this.viewModel = viewModel;
  this.bindEvents();
};

App.UI.Toolbar.prototype.bindEvents = function() {
  this.container.on('click', 'button', this.onButtonClick.bind(this));
};

App.UI.Toolbar.prototype.onButtonClick = function(e) {
  this.controller.executeAction(e, ko.dataFor(e.currentTarget));
};