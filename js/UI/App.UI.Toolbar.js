/* UI
 *************************/

App.UI.Toolbar = function(container, viewModel) {
  this.container = container;
  this.viewModel = viewModel;
  this.bindEvents();
};

App.UI.Toolbar.prototype.bindEvents = function() {
  this.container.on('click', '.add-pin', this.onAddPinClick.bind(this));
  this.container.on('click', '.add-route', this.onAddRouteClick.bind(this));
};

App.UI.Toolbar.prototype.onAddPinClick = function(e) {
  alert('Add pin!');
};

App.UI.Toolbar.prototype.onAddRouteClick = function(e) {
  alert('Add route!');
};