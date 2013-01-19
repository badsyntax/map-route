App.ViewModels.Navbar.DropMenu = function(controller) {
  this.controller = controller;
  this.options = ko.observableArray();
  this.setData();
};

App.ViewModels.Navbar.DropMenu.prototype = {
  rendered: function() {
    this.container = $('#dropmenu');
  },
  setData: function() {
    this.options([
      {
        href: '#/profile',
        title: 'Profile',
        divider: false,
        action: new App.Map.Actions.Profile()
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
  },
  onOptionClick: function(model, e) {
    e.preventDefault();
    if (model.action) {
      return model.action.execute();
    } 
    window.location = model.href;
  }
};