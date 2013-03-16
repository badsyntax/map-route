MapRoute.ViewModels.Navbar.DropMenu.Routes = function(controller) {

  MapRoute.ViewModels.Navbar.DropMenu.call(this, controller);

  var actions = {
    manage: {
      execute: function() {
        var viewModel = new MapRoute.ViewModels.Modal.Routes();
        MapRoute.UI.Modal.show('#modal-routes', {
          heading: 'Routes',
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
    },
    add: {
      execute: function(){}
    }
  };

  this.options([
    {
      href: '#/routes',
      title: 'Manage routes',
      divider: false,
      action: actions.manage
    },
    {
      href: '#/routes/add',
      title: 'Add route',
      divider: false,
      action: actions.add
    }
  ]);
};

MapRoute.ViewModels.Navbar.DropMenu.Routes.inherit(MapRoute.ViewModels.Navbar.DropMenu);