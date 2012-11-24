App.API.Pin = (function() {

  return {
    save: function(config) {
      
      $.extend(config, {
        url: '/pin/create',
        type: 'post',
        contentType: 'application/json'
      });

      return $.ajax(config);
    }
  };

}());