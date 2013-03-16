MapRoute.ViewModels.Navbar.DropMenu.User = function(controller) {

  MapRoute.ViewModels.Navbar.DropMenu.call(this, controller);

  var actions = {
    profile: {
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
      }
    }
  };

  this.options([
    {
      href: '#/profile',
      title: 'Profile',
      divider: false,
      action: actions.profile
    },
    {
      divider: true
    },
    {
      href: '/auth/signout',
      title: 'Sign out',
      divider: false
    }
  ]);
};

MapRoute.ViewModels.Navbar.DropMenu.User.inherit(MapRoute.ViewModels.Navbar.DropMenu);