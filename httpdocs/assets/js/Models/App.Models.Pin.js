App.Models.Pin = function(data) {
  App.Models.Base.apply(this, arguments);
};

App.inherits(App.Models.Pin, App.Models.Base);

App.Models.Pin.prototype.create = function(success, error) {
  App.API.Pin.create({
    data: ko.mapping.toJSON(this),
    success: success,
    error: error
  });
};