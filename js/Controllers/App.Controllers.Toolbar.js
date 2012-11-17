/* Toolbar controller
 *************************/
App.Controllers.Toolbar = function() {
  this.container = $('#toolbar');
  this.initViewModel();
  this.initUI();
};

App.Controllers.Toolbar.prototype.initViewModel = function() {
  this.viewModel = new App.ViewModels.Toolbar();
  ko.applyBindings(this.viewModel, this.container[0]);
};

App.Controllers.Toolbar.prototype.initUI = function() {
  this.ui = new App.UI.Toolbar(this.container, this.viewModel);
};