MapRoute.ViewModels.Navbar.DropMenu = function(controller) {
  this.controller = controller;
  this.options = ko.observableArray();
};

MapRoute.ViewModels.Navbar.DropMenu.prototype = {
  onOptionClick: function(model, e) {
    e.preventDefault();
    if (model.action) {
      return model.action.execute();
    }
    window.location = model.href;
  }
};