/* Modal controller
 *************************/
App.Controllers.Modal = function(container) {
  
  this.container = container || $('#modal-ui');
  this.map = App.Map.instance();

  this.viewModel = new App.ViewModels.Modal(this);
  ko.applyBindings(this.viewModel, this.container[0]);

  App.UI.Modal.setup(this, this.container, this.viewModel);
};