/* Modal controller
 *************************/
App.Controllers.Modal = function() {
  
  this.container = $('#modal-ui');
  this.map = App.Map.instance();

  this.initViewModel();
  this.initUI();
};

App.Controllers.Modal.prototype.initViewModel = function() {
  this.viewModel = new App.ViewModels.Modal(this);
  ko.applyBindings(this.viewModel, this.container[0]);
};

App.Controllers.Modal.prototype.initUI = function() {
  App.UI.Modal.setup(this, this.container, this.viewModel);
};