/* Modal viewmodel
 *************************/

App.ViewModels.Modal.Profile = function() {
  this.model = ko.observable({
    name: '',
    email: ''
  });
  this.loadUser();
};

App.ViewModels.Modal.Profile.inherit(App.ViewModels.Base, {
  loadUser: function(callback) {
    var userId = App.Config.get('user_id');
    new App.Models.User().where('id', userId).find(function(data) {
      this.model(new App.Models.User(data.users[0]));
    }.bind(this));
  },
  save: function() {
    this.model().save();
  }
});