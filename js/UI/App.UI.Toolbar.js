/* Toolbar UI
 *************************/
App.UI.Toolbar = function(controller, container, viewModel) {
  this.controller = controller;
  this.container = container.find('.toolbar');
  this.viewModel = viewModel;
  this.position();
  this.bindEvents();
};

App.UI.Toolbar.prototype.position = function() {
  this.container.css({
    marginLeft: -1 * Math.round(this.container.width() / 2)
  });
};

App.UI.Toolbar.prototype.bindEvents = function() {
  this.container.on('click', 'button', this.onButtonClick.bind(this));
};

App.UI.Toolbar.prototype.onButtonClick = function(e) {
  this.controller.executeAction(e, ko.dataFor(e.currentTarget));
};