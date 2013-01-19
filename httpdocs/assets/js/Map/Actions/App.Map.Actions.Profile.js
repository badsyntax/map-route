App.Map.Actions.Profile = function() {
  App.Map.Actions.Action.apply(this, arguments);
};

App.Map.Actions.Profile.prototype = Object.inherits(App.Map.Actions.Action, {
  execute: function() {
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
  },
  reset: function() {
    App.Map.Actions.Action.prototype.reset.apply(this, arguments);
  }
});