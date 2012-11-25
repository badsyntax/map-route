/* Edit Marker Description Modal viewmodel
 *************************/

App.ViewModels.Modal.EditMarkerDescription = function(controller) {
  App.ViewModels.Modal.apply(this, arguments);
  this.heading('Edit marker');
};

App.inherits(App.ViewModels.Modal.EditMarkerDescription, App.ViewModels.Modal);

App.ViewModels.Modal.EditMarkerDescription.prototype.setObservables = function() {
  App.ViewModels.Modal.prototype.setObservables.call(this);
  this.title = ko.observable();
  this.description = ko.observable();
};

App.ViewModels.Modal.EditMarkerDescription.prototype.reset = function() {
  this.title('');
  this.description('');
};