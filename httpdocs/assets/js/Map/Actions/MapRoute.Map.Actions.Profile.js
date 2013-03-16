MapRoute.Map.Actions.Profile = function() {
  MapRoute.Map.Actions.Action.apply(this, arguments);
};

MapRoute.Map.Actions.Profile.inherit(MapRoute.Map.Actions.Action, {
  execute: function() {
    var viewModel = new MapRoute.ViewModels.Modal.Profile();
    MapRoute.UI.Modal.show('#modal-profile', {
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
    MapRoute.Map.Actions.Action.prototype.reset.apply(this, arguments);
  }
});