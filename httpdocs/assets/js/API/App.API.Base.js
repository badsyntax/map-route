App.API.Base = function(defaultConfig) {
  this.defaultConfig = $.extend({
    contentType: 'application/json',
    dataType: 'json'
  }, defaultConfig);
};

App.API.Base.prototype.create = function(config) {
  $.extend(config, this.defaultConfig, {
    type: 'POST'
  });
  return this.makeRequest(config);  
};

App.API.Base.prototype.update = function(config) {
  $.extend(config, this.defaultConfig, {
    type: 'PUT'
  });
  return this.makeRequest(config);  
};

App.API.Base.prototype.remove = function(config) {
  $.extend(config, this.defaultConfig, {
    type: 'DELETE'
  });
  return this.makeRequest(config);  
};

App.API.Base.prototype.findAll = function(config) {
  $.extend(config, this.defaultConfig, {
    type: 'GET'
  });
  return this.makeRequest(config);  
};

App.API.Base.prototype.makeRequest = function(config) {

  var success = config.success;
  config.success = null;
  
  var xhr = $.ajax(config);

  if (config.mapResponse) {
    this.mapResponse(xhr, config.mapResponse);    
  }

  xhr.success(success);
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