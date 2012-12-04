App.API.Base = function(defaultConfig) {
  this.defaultConfig = $.extend({
    contentType: 'application/json',
    dataType: 'json',
    error: function() {
      App.log('AJAX request error', arguments);
    }
  }, defaultConfig);
};

App.API.Base.prototype.xhrConfig = function(config, xhrConfig) {
  var defaultConfig = $.extend({}, this.defaultConfig);
  return $.extend(defaultConfig, config, xhrConfig);
};

App.API.Base.prototype.create = function(config) {
  return this.makeRequest(this.xhrConfig(config, {
    type: 'POST'
  }));  
};

App.API.Base.prototype.update = function(config) {
  return this.makeRequest(this.xhrConfig(config, {
    type: 'PUT'
  }));  
};

App.API.Base.prototype.remove = function(config) {
  return this.makeRequest(this.xhrConfig(config, {
    type: 'DELETE'
  }));  
};

App.API.Base.prototype.findAll = function(config) {
  return this.makeRequest(this.xhrConfig(config, {
    type: 'GET'
  }));  
};

App.API.Base.prototype.makeRequest = function(config) {

  var success = config.success;
  config.success = null;
  
  var xhr = $.ajax(config);

  if (config.mapResponse) {
    this.mapResponse(xhr, config.mapResponse);    
  }

  xhr.success(success);

  return xhr;
};

App.API.Base.prototype.mapResponse = function(xhr, config) {
  xhr.success(function(data, textStatus, jqXHR) {
    if (!data) {
      return;
    }
    var obj = {};
    if ($.isArray(config.fields)) {
      $.each(config.fields, function(i, field) {
        if (!data[field]) {
          return;
        }
        obj[field] = data[field];
      });
    } else {
      obj = data;
    }
    ko.mapping.fromJS(obj, config.mappingOptions, config.model);
  }); 
};