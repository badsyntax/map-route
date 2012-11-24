App.Models.Base = function(data) {
  ko.mapping.fromJS(data, null, this);
};

App.Models.Base.prototype.save = function(success, error) {
  if (this.id && this.id()) {
    this.update(success, error);
  } else {
    this.create(success, error);
  }
};