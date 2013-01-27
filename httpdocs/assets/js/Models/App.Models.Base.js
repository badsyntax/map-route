App.Models.Base = function(data) {
  this.whereParam = {};
  if (data) {
    this.values(data);
    this.setObservables();
    this.setComputed();
  }
};

App.Models.Base.prototype = {
  values: function(data) {
    // Merge in fields with default data
    if (this.fields) {
      data = $.extend({}, this.fields, data);
    }
    ko.mapping.fromJS(data, null, this);
    return this;
  },
  setObservables: $.noop,
  setComputed: $.noop,
  save: function(success, error) {
    if (this.id && this.id()) {
      this.update(success, error);
    } else {
      this.create(success, error);
    }
  },
  find: function(success, error) {
    this.api.find({
      success: success,
      error: error,
      data: this.where(),
      mapResponse: {
        model: this,
        mappingOptions: {
          'routes': {
            create: function(options) {
                return new App.Models.Route(options.data);
            }
          }
        }
      }
    });
  },
  create: function(success, error) {
    this._create(success, error);
  },
  update: function(success, error) {
    this._update(success, error);
  },
  remove: function(success, error) {
    this._remove(success, error);
  },
  where: function(key, value) {
    if (!key && !value) {
      return $.param(this.whereParam);
    }
    this.whereParam[key] = value;
    return this;
  },
  _create: function(success, error) {
    this.api.create({
      data: ko.mapping.toJSON(this),
      success: success,
      error: error,
      mapResponse: {
        model: this
      }
    });
  },
  _update: function(success, error) {
    this.api.update({
      data: ko.mapping.toJSON(this),
      success: success,
      error: error
    });
  },
  _remove: function(success, error) {
    this.api.remove({
      data: ko.mapping.toJSON(this),
      success: success,
      error: error
    });
  }
};