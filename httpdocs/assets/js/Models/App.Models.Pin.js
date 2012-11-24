App.Models.Pin = function(data) {
  ko.mapping.fromJS(data, null, this);
};

App.Models.Pin.prototype.save = function(success, error) {
  App.API.Pin.save({
    data: ko.mapping.toJSON(this),
    success: success,
    error: error
  });
};