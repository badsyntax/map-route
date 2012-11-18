/* Modal viewmodel
 *************************/

App.ViewModels.Modal = function(controller) {
  this.controller = controller;
  this.setObservables();
};

App.ViewModels.Modal.prototype.setObservables = function() {
  this.heading = ko.observable('Info');
  this.content = ko.observable();
};