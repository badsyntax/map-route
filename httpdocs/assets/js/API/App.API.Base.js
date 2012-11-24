App.API.Base = function(defaultConfig) {
  this.defaultConfig = defaultConfig;
};

App.API.Base.prototype.create = function(config) {

  $.extend(config, this.defaultConfig, {
    type: 'PUT',
    contentType: 'application/json'
  });

  return $.ajax(config);
};