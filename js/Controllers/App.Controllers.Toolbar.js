/* Toolbar controller
 *************************/
App.Controllers.Toolbar = function() {
  
  this.container = $('#toolbar');
  this.map = App.Map.instance();
  this.curAction = null;

  this.initViewModel();
  this.initUI();
};

App.Controllers.Toolbar.prototype.initViewModel = function() {
  this.viewModel = new App.ViewModels.Toolbar(this);
  ko.applyBindings(this.viewModel, this.container[0]);
};

App.Controllers.Toolbar.prototype.initUI = function() {
  this.ui = new App.UI.Toolbar(this, this.container, this.viewModel);
};

App.Controllers.Toolbar.prototype.executeAction = function(e, model) {
  if (this.curAction) {
    this.curAction.reset();
  }
  (this.curAction = model.action).execute();
};