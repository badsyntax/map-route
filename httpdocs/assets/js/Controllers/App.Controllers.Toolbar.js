/* Toolbar controller
 *************************/
App.Controllers.Toolbar = function() {
  
  this.container = $('#toolbar-ui');
  this.map = App.Map.instance();
  this.curAction = null;

  this.viewModel = new App.ViewModels.Toolbar(this);
  ko.applyBindings(this.viewModel, this.container[0]);

  this.ui = new App.UI.Toolbar(this, this.container, this.viewModel);
};

App.Controllers.Toolbar.prototype.executeAction = function(e, model) {
  if (this.curAction) {
    this.curAction.reset();
  }
  (this.curAction = model.action).execute();
};