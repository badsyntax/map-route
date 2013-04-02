MapRoute.Models.Base = function(data) {
  this.whereParam = {};
  if (data) {
    this.values(data);
    this.setObservables();
    this.setComputed();
  }
};

MapRoute.Models.Base.prototype = {
  constructor: MapRoute.Models.Base,
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
      return this.update(success, error);
    } else {
      return this.create(success, error);
    }
  },
  find: function(success, error) {
    return this.api.find({
      data: this.where()
    })
    .done(success)
    .fail(error);
  },
  findAll: function(success, error) {
    return this.api.findAll({
      data: this.where()
    })
    .done(success)
    .fail(error);
  },
  create: function(success, error) {
    return this._create(success, error);
  },
  update: function(success, error) {
    return this._update(success, error);
  },
  remove: function(success, error) {
    return this._remove(success, error);
  },
  where: function(key, value) {
    if (!key && !value) {
      return $.param(this.whereParam);
    }
    this.whereParam[key] = value;
    return this;
  },
  _create: function(success, error) {
    return this.api.create({
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
    return this.api.update({
      data: ko.mapping.toJSON(this)
    })
    .done(success)
    .fail(error);
  },
  _remove: function(success, error) {
    return this.api.remove({
      data: ko.mapping.toJSON(this)
    })
    .done(success)
    .done(this._onSuccess)
    .fail(error);
  }
};