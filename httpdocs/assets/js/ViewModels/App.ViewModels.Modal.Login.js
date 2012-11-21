/* Modal viewmodel
 *************************/

App.ViewModels.Modal.Login = function(controller) {
  App.ViewModels.Modal.apply(this, arguments);
  this.heading('Sign in');
};

App.inherits(App.ViewModels.Modal.Login, App.ViewModels.Modal);