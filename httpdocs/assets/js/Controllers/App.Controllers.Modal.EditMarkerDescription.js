/* Modal controller
 *************************/
App.Controllers.Modal.EditMarkerDescription = function() {
  this.modal = App.UI.Modal.EditMarkerDescription;
  App.Controllers.Modal.call(this, $('#modal-edit-marker-description'));
  this.bindEvents();
};

App.inherits(App.Controllers.Modal.EditMarkerDescription, App.Controllers.Modal);

App.Controllers.Modal.EditMarkerDescription.prototype.initViewModel = function() {
  this.viewModel = new App.ViewModels.Modal.EditMarkerDescription(this);
  ko.applyBindings(this.viewModel, this.container[0]);
};

App.Controllers.Modal.EditMarkerDescription.prototype.initUI = function() {
  this.modal.setup(this, this.container, this.viewModel);
};

App.Controllers.Modal.EditMarkerDescription.prototype.bindEvents = function() {
  this.modal.container.on('hide', function() {
    this.viewModel.reset();
  }.bind(this));
};