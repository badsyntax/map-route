/* Modal controller
 *************************/
App.Controllers.Modal.Login = function() {
  App.Controllers.Modal.call(this, $('#modal-login-ui'))
};

App.inherits(App.Controllers.Modal.Login, App.Controllers.Modal);

App.Controllers.Modal.Login.prototype.initViewModel = function() {
  this.viewModel = new App.ViewModels.Modal.Login(this);
  ko.applyBindings(this.viewModel, this.container[0]);
};

App.Controllers.Modal.Login.prototype.initUI = function() {
  App.UI.Modal.Login.setup(this, this.container, this.viewModel);
};