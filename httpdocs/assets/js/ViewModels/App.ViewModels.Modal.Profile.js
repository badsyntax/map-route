/* Modal viewmodel
 *************************/

App.ViewModels.Modal.Profile = function(container, controller) {
  this.container = container;
  this.controller = controller;
  this.model = ko.observable({
    name: '',
    email: ''
  });
  this.loadUser(this.values.bind(this));
};

App.Models.User.prototype = {
  loadUser: function(callback) {
    var userId = App.Config.get('user_id');
    new App.Models.User().where('id', userId).find(function(data) {
      this.model(new App.Models.User(data.users[0]));
    }.bind(this));
  },
  values: function(data) {
    ko.mapping.fromJS(data, null, this);
  },
  save: function() {
    this.model().save();
  }
};