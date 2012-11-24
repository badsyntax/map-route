App.API.Pin = (function(api) {

  return {
    create: function(config) {
      return api.create(config);
    }
  };

}(new App.API.Base({
  url: '/api/pin'
})));