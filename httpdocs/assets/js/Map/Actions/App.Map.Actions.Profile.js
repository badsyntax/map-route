App.Map.Actions.Profile = function() {
  App.Map.Actions.Action.apply(this, arguments);
};

App.inherits(App.Map.Actions.Profile, App.Map.Actions.Action);

App.Map.Actions.Profile.prototype.execute = function() {
  var viewModel = new App.ViewModels.Modal.Profile();
  App.UI.Modal.show('#modal-profile', {
    heading: 'Profile',
    buttons: [{
      title: 'Save',
      action: viewModel.save.bind(viewModel),
      type: 'btn-primary'
    }, {
      title: 'Cancel',
      action: '',
      type: ''
    }]
  }, viewModel);
};

App.Map.Actions.Profile.prototype.reset = function() {
  App.Map.Actions.Action.prototype.reset.apply(this, arguments);
};