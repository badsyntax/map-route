App.Models.User = function(data) {
  App.Models.Base.apply(this, arguments);
  this.api = App.API.User;
};

App.inherits(App.Models.User, App.Models.Base);