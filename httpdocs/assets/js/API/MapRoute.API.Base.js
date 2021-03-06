MapRoute.API.Base = function(defaultConfig) {
  this.defaultConfig = $.extend({
    contentType: 'application/json',
    dataType: 'json',
    error: function() {
      MapRoute.log('AJAX request error', arguments);
    }
  }, defaultConfig);
};

MapRoute.API.Base.prototype = {
  xhrConfig: function(config, xhrConfig) {
    var defaultConfig = $.extend({}, this.defaultConfig);
    return $.extend(defaultConfig, config, xhrConfig);
  },
  create: function(config) {
    return this.makeRequest(this.xhrConfig(config, {
      type: 'POST'
    }))
    .done(this._onSuccess)
    .fail(this._onErro);
  },
  update: function(config) {
    return this.makeRequest(this.xhrConfig(config, {
      type: 'PUT'
    }))
    .done(this._onSuccess)
    .fail(this._onErro);
  },
  remove: function(config) {
    return this.makeRequest(this.xhrConfig(config, {
      type: 'DELETE',
      dataType: 'text'
    }))
    .done(this._onSuccess)
    .fail(this._onErro);
  },
  findAll: function(config) {
    return this.makeRequest(this.xhrConfig(config, {
      type: 'GET'
    }));
  },
  find: function(config) {
    return this.makeRequest(this.xhrConfig(config, {
      type: 'GET'
    }));
  },
  makeRequest: function(config) {

    var success = config.success;
    config.success = null;

    var xhr = $.ajax(config);

    if (config.mapResponse) {
      this.mapResponse(xhr, config.mapResponse);
    }

    xhr.success(success);

    return xhr;
  },
  mapResponse: function(xhr, config) {
    xhr.success(function(data, textStatus, jqXHR) {

      if (!data) {
        return;
      }
      var obj = {};

      // Map specific fields in response
      if ($.isArray(config.fields)) {
        $.each(config.fields, function(i, field) {
          if (!data[field]) {
            return;
          }
          obj[field] = data[field];
        });

      // Map all fields in response
      } else {
        obj = data;
      }

      ko.mapping.fromJS(obj, config.mappingOptions, config.model);
      // console.log(obj);
    });
  },
  _onSuccess: function() {
    MapRoute.GlobalEvents.trigger('api.request.success');
  },
  _onError: function() {
    MapRoute.GlobalEvents.trigger('api.request.error');
  }
};