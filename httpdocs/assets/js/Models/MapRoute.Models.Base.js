MapRoute.Models.Base = function(data) {
  this.whereParam = {};
  if (data) {
    this.values(data);
    this.setObservables();
    this.setComputed();
  }
};

MapRoute.Models.Base.prototype = {
  values: function(data) {

    // Merge in default data
    data = this.defaultValues(this.fields || {}, data);

    ko.mapping.fromJS(data, null, this);

    return this;
  },
  defaultValues: function(fields, data) {
    var obj = {};
    for(var key in fields) {
      if (this[key] === undefined) {
        obj[key] = fields[key];
      }
    }
    return $.extend({}, obj, data);
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
      data: this.where(),
      mapResponse: {
        model: this,
        mappingOptions: {
          'routes': {
            create: function(options) {
                return new MapRoute.Models.Route(options.data);
            }
          }
        }
      }
    })
    .done(success)
    .fail(error);
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
      mapResponse: {
        model: this
      }
    })
    .done(success)
    .done(this._onSuccess)
    .fail(error);
  },
  _update: function(success, error) {
    this.api.update({
      data: ko.mapping.toJSON(this)
    })
    .done(success)
    .fail(error);
  },
  _remove: function(success, error) {
    this.api.remove({
      data: ko.mapping.toJSON(this)
    })
    .done(success)
    .done(this._onSuccess)
    .fail(error);
  }
};