App.Models.User = function(data) {
  App.Models.Base.apply(this, arguments);
  this.api = App.API.User;
};

App.Models.User.inherit(App.Models.Base);