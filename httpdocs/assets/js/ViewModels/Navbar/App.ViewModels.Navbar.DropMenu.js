App.ViewModels.Navbar.DropMenu = function(container, controller) {
  this.container = container;
  this.controller = controller;
  this.options = ko.observableArray();
  this.setData();
};

App.ViewModels.Navbar.DropMenu.prototype.rendered = function() {
  // this.ui = new App.UI.Toolbar(this.container, this);
};

App.ViewModels.Navbar.DropMenu.prototype.setData = function() {
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
};

App.ViewModels.Navbar.DropMenu.prototype.onOptionClick = function(model, e) {
  e.preventDefault();
  if (model.action) {
    return model.action.execute();
  } 
  console.log('clicked on a option');
  window.location = model.href;
};