/* Sign In controller
 *************************/
App.Controllers.SignIn = function() {
  this.initModal();
  this.showLoginModal();
};

App.Controllers.SignIn.prototype.initModal = function() {
  var container = $('#modal');
  var viewModel = new App.ViewModels.Modal(container);
  ko.applyBindings(viewModel, container[0]);
  App.UI.Modal.setup(container, viewModel);
};

App.Controllers.SignIn.prototype.showLoginModal = function() {
  setTimeout(function() {

    App.UI.Modal.show('#modal-login', {
      heading: 'Sign in',
      controls: false
    });
  
    App.Map.create();
  
  }, 150);
};