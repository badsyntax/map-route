/* Modal viewmodel
 *************************/

MapRoute.ViewModels.Modal.Profile = function() {
  this.model = ko.observable({
    name: '',
    email: ''
  });
  this.loadUser();
};

MapRoute.ViewModels.Modal.Profile.inherit(MapRoute.ViewModels.Base, {
  loadUser: function(callback) {
    var userId = MapRoute.Config.get('user_id');
    new MapRoute.Models.User().where('id', userId).find(function(data) {
      this.model(new MapRoute.Models.User(data.users[0]));
    }.bind(this));
  },
  save: function() {
    this.model().save();
  }
});