App.Models.Base = function(data) {
  this.whereParam = {};
  if (data) {
    this.values(data);
  }
};

App.Models.Base.prototype.values = function(data) {
  ko.mapping.fromJS(data, null, this);
  return this;
};

App.Models.Base.prototype.save = function(success, error) {
  if (this.id && this.id()) {
    this.update(success, error);
  } else {
    this.create(success, error);
  }
};

App.Models.Base.prototype.where = function(key, value) {
  if (!key && !value) {
    return $.param(this.whereParam);
  }
  this.whereParam[key] = value;
  return this;
};

App.Models.Base.prototype._create = function(api, success, error) {
  api['create']({
    data: ko.mapping.toJSON(this),
    success: success,
    error: error,
    mapResponse: {
      fields: [ 'id' ],
      model: this
    }
  });
};

App.Models.Base.prototype._update = function(api, success, error) {
  api['update']({
    data: ko.mapping.toJSON(this),
    success: success,
    error: error
  });
};

App.Models.Base.prototype._remove = function(api, success, error) {
  api['remove']({
    data: ko.mapping.toJSON(this),
    success: success,
    error: error
  });
};